import LoaderAnimated2 from './../../../assets/Loader2.gif'
const LoaderComponent = () => {
    return (
        <div>
            <img style={{height:250}} className={"height-[150px]"} src={LoaderAnimated2} height={250} alt={"Loading"}/>
        </div>
    );
};

export default LoaderComponent;