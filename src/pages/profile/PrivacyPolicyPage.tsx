import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { handleGetPrivacyPolicy } from "@/api/privacy-terms/privacy-terms";

type Policy = {
    id: number;
    type: string;
    title: string;
    content: string;
};

export const PrivacyPage: React.FC = () => {
    const nav = useNavigate();

    const [data, setData] = React.useState<Policy | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await handleGetPrivacyPolicy();
                setData(res ?? null);
            } catch (e) {
                setError("Failed to load policy");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const renderContent = (text: string) => {
        return text.split(/\n\n+/).map((block, i) => {
            if (/^\d+\)/.test(block)) {
                const [titleLine, ...rest] = block.split("\n");
                return (
                    <section key={i} className="space-y-1">
                        <h3 className="font-semibold text-zinc-900">
                            {titleLine}
                        </h3>
                        <p className="text-sm leading-6 text-zinc-600">
                            {rest.join(" ")}
                        </p>
                    </section>
                );
            }
            return (
                <p key={i} className="text-sm leading-6 text-zinc-600">
                    {block}
                </p>
            );
        });
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-md sm:max-w-lg md:max-w-xl px-4 py-4">
                <div className="flex items-center gap-2 pb-4">
                    <button
                        type="button"
                        className="-ml-2 rounded-full p-2 hover:bg-zinc-100"
                        aria-label="Back"
                        onClick={() => nav(-1)}
                    >
                        <ChevronLeft className="h-5 w-5 text-zinc-700" />
                    </button>
                    <h1 className="mx-auto text-lg sm:text-xl md:text-2xl font-semibold text-zinc-900">
                        {data?.title || "Privacy Policy"}
                    </h1>
                    <div className="w-9" />
                </div>

                {loading && (
                    <div className="space-y-3">
                        <div className="h-5 w-40 rounded bg-zinc-100 animate-pulse" />
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="h-3 w-full rounded bg-zinc-100 animate-pulse"
                            />
                        ))}
                    </div>
                )}

                {!loading && error && (
                    <p className="text-sm text-rose-600">{error}</p>
                )}

                {!loading && !error && data && (
                    <article className="space-y-5">
                        {renderContent(data.content)}
                    </article>
                )}
            </div>
        </div>
    );
};

export default PrivacyPage;
