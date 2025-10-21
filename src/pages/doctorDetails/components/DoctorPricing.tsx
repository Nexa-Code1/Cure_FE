type DoctorPricingProps = {
    pricePerHour: number;
    buttonLabel: string;
};

function DoctorPricing({ pricePerHour }: DoctorPricingProps) {
    return (
        <div className="flex items-center justify-between">
            <p className="text-2xl font-medium text-primary-200">
                Price
                <span className="text-sm font-light text-secondary-400">
                    \hour
                </span>
            </p>
            <p className="text-error-500 font-medium text-base">
                {pricePerHour} EGP
            </p>
        </div>
    );
}

export default DoctorPricing;
