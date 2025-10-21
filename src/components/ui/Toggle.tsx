type Props = { checked: boolean; onChange?: (v: boolean) => void };

export default function Toggle({ checked, onChange }: Props) {
    return (
        <button
            role="switch"
            aria-checked={checked}
            onClick={() => onChange?.(!checked)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition
        focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2
        ${checked ? "bg-green-500" : "bg-zinc-300"}`}
        >
            <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition
          ${checked ? "translate-x-5" : "translate-x-0"}`}
            />
        </button>
    );
}
