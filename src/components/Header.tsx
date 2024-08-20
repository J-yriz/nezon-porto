import Image from "next/image";
import Link from "next/link";

const nameHeader = () => (
  <p className="font-outline-2-light dark:font-outline-2-dark mx-auto px-10 text-center text-6xl font-extrabold sm:text-8xl lg:px-0 xl:text-9xl">
    Nezon Sakamuya
  </p>
);

interface IHeaderParams {
  windowWidth: number;
}

const Header = ({ windowWidth }: IHeaderParams) => (
  <header className="mt-20 px-0 sm:mt-36 lg:px-10 xl:px-28">
    {nameHeader()}
    <div className="mx-auto mt-16 flex max-w-screen-2xl flex-col items-center lg:mt-24 lg:flex-row lg:justify-between">
      {windowWidth >= 1024 && (
        <div className="flex w-1/3 flex-col gap-y-10 text-start">
          <div>
            <p className="text-sm font-semibold">BIOGRAPHY</p>
            <p>
              I am an SMK student living outside Java, balancing studies with freelancing. This journey has taught me adaptability, discipline, and a
              commitment to growth.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">SKILLS</p>
            <p>Video Editing • Pixel Art • Draw Image • Building Minecraft • Design</p>
          </div>
          <div>
            <p className="text-sm font-semibold">SOCIAL MEDIA</p>
            <div className="flex gap-x-2">
              <Link href={"#"} target="_blank">
                <Image src={"/icon/instagram.svg"} alt="instagram" width={40} height={40} className="rounded-md bg-lightBlue p-1 dark:bg-blueCus" />
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="rounded-full border border-black bg-gradient-to-r from-cyan-200 to-blue-400 dark:border-liteLightBlue dark:from-cyan-500 dark:to-blue-700">
        <Image src={"/nezonProf.png"} alt="hero" width={300} height={300} quality={100} className="rounded-full p-1" />
      </div>
      <div className="my-10 w-full px-10 lg:mt-0 lg:w-1/3 lg:px-0">
        {windowWidth < 1024 && (
          <div className="flex flex-wrap justify-between gap-5 text-start">
            <div className="w-full md:w-1/3">
              <p className="text-sm font-semibold">BIOGRAPHY</p>
              <p>
                I am an SMK student living outside Java, balancing studies with freelancing. This journey has taught me adaptability, discipline, and
                a commitment to growth.
              </p>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3">
              <p className="text-sm font-semibold">SKILLS</p>
              <p>Video Editing • Pixel Art • Draw Image • Building Minecraft • Design</p>
            </div>
            <div>
              <p className="text-sm font-semibold">SOCIAL MEDIA</p>
              <div className="flex gap-x-2">
                <Link href={"#"} target="_blank">
                  <Image src={"/icon/instagram.svg"} alt="instagram" width={40} height={40} className="rounded-md bg-lightBlue p-1 dark:bg-blueCus" />
                </Link>
              </div>
            </div>
          </div>
        )}
        <div className="mt-5 flex flex-wrap justify-between gap-10 text-start lg:mt-0 lg:flex-col lg:text-end">
          <div>
            <p className="text-sm font-semibold">PROJECT DONE</p>
            <p className="text-3xl font-light md:text-5xl">1000</p>
          </div>
          <div>
            <p className="text-sm font-semibold">WORK EXPERIENCE</p>
            <p className="text-3xl font-light md:text-5xl">1 YR+</p>
          </div>
          <div>
            <p className="text-sm font-semibold">CLIENT ORDER</p>
            <p className="text-3xl font-light md:text-5xl">130</p>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
