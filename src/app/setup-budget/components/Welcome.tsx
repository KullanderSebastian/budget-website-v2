import ButtonComponent from "@/app/components/ButtonComponet";

export default function Welcome({ onNext }: { onNext: () => void }) {
    return (
        <div className="w-[25vw]">
            <h1 className="text-2xl font-bold text-headerGray mb-4">Let’s Build Your Personalized Budget</h1>
            <p className="text-sm text-textGray mb-2">Here’s what we’ll do together:</p>
            <ul className="list-disc list-inside text-textGray text-sm marker:text-customPurple-1300 mb-8">
                <li>Identify your income sources</li>
                <li>Categorize your expenses (fixed, variable, and discretionary)</li>
                <li>Set savings and debt goals</li>
                <li>Review and adjust your plan for success</li>
            </ul>
            <p className="text-sm text-textGray mb-4">Ready to get started?</p>
            <ButtonComponent 
                type="button"
                title="Start Budget Planner"
                onClick={onNext}
            />
        </div>
    )
}