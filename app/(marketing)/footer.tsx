
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className=" bg-black text-white">
      <div className=" h-[200px] justify-between flex">
        <div className=" p-6 pt-10">
          <h2 className=" text-3xl font-thin font-bricolage">
            Improving people's future through <br /> better resources.
          </h2>
        </div>
        <div className=" items-center justify-center p-10 flex gap-x-7 font-roboto">
          <div>
            <p className=" text-gray-400 pb-4">Product</p>
            <ul>
              <li>Overview</li>
              <li>Features</li>
              <li>Releases</li>
            </ul>
          </div>
          <div>
            <p className=" text-gray-400 pb-4 mt-2">Socials</p>
            <ul>
              <li className="inline-flex items-center gap-2">
                 LinkedIn
              </li>
              <br />
              <li className="inline-flex items-center gap-2">
                
                Twitter
              </li>
              <br />
              <li className="inline-flex items-center gap-2">
                
                Instagram
              </li>
            </ul>
          </div>
          <div></div>
        </div>
      </div>
      <hr className="h-px  bg-gray-200 border-0 dark:bg-gray-500" />
      <div className="flex h-[100px]  justify-between p-5 py-10 ">
        <div className="flex ">
          <p className=" text-sm">©{year} WordWizard. All rights reserved.</p>
        </div>
        <div className="flex pr-14">
          <ul className=" inline-flex gap-x-3 ">
            <li className=" block"> Terms </li>
            <li className=" block"> Privacy </li>
            <li className=" block"> Cookies </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Footer;
