/**
 * Communicates the role and function of Manual Mode.
 */

export default function ManualModeBanner() {

    return (

        <div className="bg-[#D6F4EF] font-medium text-[#00654B] py-3 px-4 rounded-xl flex flex-col md:flex-row md:items-center gap-3 mb-1 md:w-[95%]">

            <p className="font-semibold shrink-0 md:mr-1">
                <span className="fa-solid fa-user"></span>&thinsp;
                Manual Mode
            </p>

            <p className="text-sm">
                Use this mode to manually edit recipe details, and correct any mistakes made by AI Assist. Fields that
                were originally filled by AI Assist are indicated with the <small className="fa-solid fa-bolt"></small> symbol. 
                Spam Policy is applicable on all edits, and AI Insights may be queued for an update based on the changes you make.
            </p>

        </div>
        
    );
}