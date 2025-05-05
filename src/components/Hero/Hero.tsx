import { useTranslations } from "next-intl";
import { WavyBackground } from "../UI/wavy-background";

export function Hero() {
    const t = useTranslations('Hero');

    return (
        <WavyBackground className="">
            <div className="flex flex-col items-center justify-center ">
                <h2 className="text-xl max-[540px]:text-4xl sm:text-4xl md:text-5xl lg:text-7xl font-light inter-var text-center">
                    {t('title')}
                </h2>
            </div>
        </WavyBackground>
    )
}