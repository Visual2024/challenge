import { useTranslations } from "next-intl";
import { WavyBackground } from "../UI/wavy-background";

export function Hero() {
    const t = useTranslations('Hero');

    return (
        <WavyBackground className="">
            <h2 className="text-2xl  md:text-4xl lg:text-7xl font-bold inter-var text-center">
                {t('title')}
            </h2>
            <p className="text-base  md:text-lg mt-4  font-normal inter-var text-center">
                {t('description')}
            </p>
        </WavyBackground>
    )
}