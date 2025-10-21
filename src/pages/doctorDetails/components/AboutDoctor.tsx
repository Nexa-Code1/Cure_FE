import { useState } from "react";

import { Button } from "@/components/ui/button";

type AboutDoctorProps = { about: string };

function AboutDoctor({ about }: AboutDoctorProps) {
    const [isShowMore, setIsShowMore] = useState(false);
    const aboutMe =
        !isShowMore && about.length > 100 ? about.slice(0, 100) + "..." : about;

    return (
        <section className="my-8">
            <h2 className="font-medium text-lg mb-2">About me</h2>
            <p className="text-secondary-400">
                {aboutMe}{" "}
                {about.length > 100 && (
                    <Button
                        variant="ghost"
                        className="cursor-pointer text-primary-100 hover:bg-transparent focus:bg-transparent p-0"
                        onClick={() => setIsShowMore((curStatus) => !curStatus)}
                    >
                        {isShowMore ? "Read less" : "Read more"}
                    </Button>
                )}
            </p>
        </section>
    );
}

export default AboutDoctor;
