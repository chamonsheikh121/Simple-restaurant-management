import { Parallax } from "react-parallax";

const PageHeader = ({ image, title, bio }) => {
    return (<><Parallax
        blur={{ min: -50, max: 50 }}
        bgImage={image}
        bgImageAlt="the dog"
        strength={-200}
       bgImageStyle={{objectFit:'cover'}}
    >
        <div className="relative h-[400px] mb-32">
            
            <div className="absolute top-0 flex justify-center items-center h-full w-full mt-14">
                <div className="bg-black w-[600px] opacity-70 space-y-5 py-20 text-white text-center">
                    <h1 className="text-3xl md:text-6xl uppercase font-bold">{title}</h1>
                    <p className=" uppercase md:text-xl">{bio}</p>
                </div>
            </div>



        </div>
    </Parallax></>

    );
};

export default PageHeader;