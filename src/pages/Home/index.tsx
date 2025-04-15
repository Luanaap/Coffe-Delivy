import { texts } from "../../i18n/pt";
import { Heading, Hero, HeroContent } from "./styles";

export function Home() {
  return (
    <div>
      <Hero>
        <HeroContent>
          <div>
            <Heading>
              <h1>{texts.home.title}</h1>

              <span>{texts.home.subtitle}</span>
            </Heading>

          </div>
        </HeroContent>
      </Hero>
    </div>
  )
}