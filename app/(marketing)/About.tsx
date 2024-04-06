
import Image from "next/image";
export default function About() {
  return (
    <div className="bg-gray-800 py-20 px-10">
      <div className="flex flex-col md:flex-row md:items-center mx-auto max-w-6xl">
        <div className="md:w-1/2 md:pr-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-center md:text-left text-white font-bold">
          {/* How It Works */}
            <span className="block text-yellow-400 text-4xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-10">
            Fun, accessible language learning.
            </span>
          </h1>
          <p className="mt-4 max-w-lg text-white text-lg">Begin by selecting their desired language and proficiency level.WordWizard level-based system aids learning. Users gain or lose hearts based on answers. Advancing levels enhances proficiency. Hearts regenerate, or can be purchased for uninterrupted learning. This adaptive approach ensures tailored progression, accommodating individual pace and providing a seamless language learning experience</p>
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0">
        <Image src="/About.png" alt="Description of the image" width={700} height={700} />        </div>
      </div>
    </div>
  );
}

