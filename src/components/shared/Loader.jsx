import { DNA } from "react-loader-spinner";

const Loader = ({ text }) => {
    return (
        <div className="flex justify-center items-center w-full h-[450px]">
            <div className="flex flex-col items-center gap-1">
                <DNA
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                />
                <p className="text-slate-200">
                    {text ? text : "Please wait..."}
                </p>
            </div>
        </div>
    );
}

export default Loader;