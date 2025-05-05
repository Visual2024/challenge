import { useTranslations } from "next-intl";
import { WavyBackground } from "../UI/wavy-background";

export function Hero() {
    const t = useTranslations('Hero');

    return (
        <WavyBackground className="">
            <div className="flex flex-col items-center justify-center ">
                <h2 className="text-xl md:text-4xl lg:text-5xl font-semibold inter-var text-center w-[70%]">
                    {t('title')}
                </h2>
            </div>
        </WavyBackground>
    )
}