import { TabsList, TabsTrigger } from "@/components/ui/tabs";

type TabProps = {
    value: string;
    label: string;
};

function Tab({ value, label }: TabProps) {
    return (
        <TabsTrigger
            value={value}
            className="data-[state=active]:bg-primary-100 data-[state=active]:text-white text-secondary-500 p-2 sm:p-4 text-sm sm:text-base cursor-pointer"
        >
            {label}
        </TabsTrigger>
    );
}

function AppointmentFilterTabs() {
    return (
        <TabsList className="mb-4 bg-transparent mx-auto sm:mx-0">
            <Tab value="all" label="All" />
            <Tab value="upcoming" label="Upcoming" />
            <Tab value="completed" label="Completed" />
            <Tab value="cancelled" label="Cancelled" />
        </TabsList>
    );
}

export default AppointmentFilterTabs;
