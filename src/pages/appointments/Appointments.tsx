import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { isSameDay } from "date-fns";

import { getUserAppointments } from "@/api/appointments/appointments";
import AppointmentCard from "./components/AppointmentCard";
import type { IAppointment } from "@/types";
import AppointmentFilterTabs from "./components/AppointmentFilterTabs";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Loader } from "@/components/common/Loader";
import AppointmentCalender from "./components/AppointmentCalender";
import NoData from "@/components/common/NoData";

function Appointments() {
    const [dates, setDates] = useState<Date[] | undefined>(undefined);

    const [userAppointments, setUserAppointments] = useState<IAppointment[]>(
        []
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isDeletingAppointment, setIsDeletingAppointment] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const filterBy = searchParams.get("filter") || "";

    useEffect(() => {
        async function fetchUserAppointments() {
            try {
                setIsLoading(true);
                const res = await getUserAppointments(filterBy);
                console.log(res);
                setUserAppointments(res);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchUserAppointments();
    }, [isDeletingAppointment]);

    if (isLoading) return <Loader className="mt-40 mx-auto" size="xl" />;
    if (!isLoading && (!userAppointments || !userAppointments?.length))
        return <NoData />;

    let filterdAppointments = userAppointments;
    if (filterBy === "all") filterdAppointments = userAppointments;
    if (dates && dates.length > 0)
        filterdAppointments = filterdAppointments.filter(
            (appointment: IAppointment) =>
                dates?.some((date) =>
                    isSameDay(new Date(appointment.day), new Date(date))
                )
        );
    if (filterBy && filterBy !== "all")
        filterdAppointments = filterdAppointments.filter(
            (appointment: IAppointment) => appointment.status === filterBy
        );

    return (
        <div className="relative">
            <div className="flex items-center justify-between">
                <h1 className="font-medium text-base sm:text-lg mb-4">
                    Your appointments
                </h1>
                <AppointmentCalender dates={dates} setDates={setDates} />
            </div>

            <Tabs
                defaultValue={filterBy || "all"}
                onValueChange={(value) => setSearchParams(`?filter=${value}`)}
            >
                <AppointmentFilterTabs />

                {filterdAppointments.length === 0 ? (
                    <NoData />
                ) : (
                    <TabsContent
                        value={filterBy || "all"}
                        className="flex flex-wrap gap-6 justify-center xl:justify-start"
                    >
                        {filterdAppointments.map(
                            (appointment: IAppointment) => (
                                <AppointmentCard
                                    appointment={appointment}
                                    key={appointment.id}
                                    isDeletingAppointment={
                                        isDeletingAppointment
                                    }
                                    setIsDeletingAppointment={
                                        setIsDeletingAppointment
                                    }
                                />
                            )
                        )}
                    </TabsContent>
                )}
            </Tabs>
        </div>
    );
}

export default Appointments;
