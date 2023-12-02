/**
 * Communicates spam policy
 */

export default function SpamBanner() {

    return (

        <div className="bg-yellow-100 font-medium text-yellow-900 py-3 px-4 rounded-xl flex flex-col md:flex-row md:items-center gap-2 md:w-[95%]">

            <p className="font-semibold shrink-0 md:mr-1">
                <i className="fa-solid fa-triangle-exclamation"/>&thinsp;
                Spam Policy
            </p>

            <p className="text-sm md:mt-1">
                Please submit valid food recipes only - this helps maintain a pleasant experience for everyone and
                ensure that things work as intended. Expletives are strictly prohibited.
                <b> If you are testing the application, you may consider&nbsp;
                    <a href="https://github.com/dhruv-tech/ninjachefs/wiki" className="underline" target="_blank" rel="noreferrer">
                        copy-pasting a recipe from here.
                    </a>
                </b>

            </p>

        </div>
        
    );
}