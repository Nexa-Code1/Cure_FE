import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { IAvailableSlot, IAppointmentValues } from "@/types";
import type { FormikProps } from "formik";
import AlertMsg from "@/components/common/AlertMsg";

type AppointmentTimeProps = {
    formik: FormikProps<IAppointmentValues>;
    availableSlots: IAvailableSlot[];
};

function AppointmentTime({ formik, availableSlots }: AppointmentTimeProps) {
    const availableTimes = formik.values.date
        ? availableSlots.filter(
              (slot: IAvailableSlot) =>
                  new Date(slot.day).toDateString() ===
                  new Date(formik.values.date).toDateString()
          )
        : [];

    return (
        <>
            <RadioGroup
                onValueChange={(time) => formik.setFieldValue("time", time)}
                value={formik.values.time}
                className="flex flex-wrap gap-2"
                name="time"
            >
                {!availableTimes.length ? (
                    <p className="p-2 border-1 border-primary-100 rounded-md w-full">
                        Please select an available date!
                    </p>
                ) : (
                    availableTimes.map((slot: IAvailableSlot) =>
                        slot.slots.map((time: string) => (
                            <div key={time}>
                                <RadioGroupItem
                                    value={time}
                                    id={time}
                                    className="hidden"
                                />

                                <Label
                                    htmlFor={time}
                                    className={`cursor-pointer text-gray-500 px-4 py-2 rounded-full border-2 border-blue-50 flex items-center gap-1 focus:border-blue-700 hover:bg-secondary-100 ${
                                        formik.values.time === time
                                            ? "bg-primary-100 text-secondary-100 hover:bg-blue-800"
                                            : ""
                                    }`}
                                >
                                    {time}
                                </Label>
                            </div>
                        ))
                    )
                )}
            </RadioGroup>

            {formik.touched.time && formik.errors.time ? (
                <AlertMsg message={formik.errors.time} />
            ) : null}
        </>
    );
}

export default AppointmentTime;
