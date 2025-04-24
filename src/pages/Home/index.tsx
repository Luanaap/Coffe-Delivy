import { Coffee, Package, ShoppingCart, Timer } from "phosphor-react";
import { texts } from "../../i18n/pt";
import { CoffeList, Heading, Hero, HeroContent, Info } from "./styles";
import { useTheme } from "styled-components";
import { Card } from "../../components/Card";
import { coffees } from '../../../data.json'

export function Home() {
  const theme = useTheme();

  return (
    <div>
      <Hero>
        <HeroContent>
          <div>
            <Heading>
              <h1>{texts.home.title}</h1>

              <span>{texts.home.subtitle}</span>
            </Heading>

            <Info>
              <div>
                <ShoppingCart
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors["yellow-dark"] }}
                />
                <span>{texts.home.features.simpleOrdering}</span>
              </div>

              <div>
                <Package
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors['base-text']}}
                />
                <span>{texts.home.features.fastDelivery}</span>
              </div>

              <div>
                <Timer
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors.yellow }}
                />
                <span>{texts.home.features.fastDelivery}</span>
              </div>

              <div>
                <Coffee
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors.purple }}
                />
                <span>{texts.home.features.coffeeOnTheWay}</span>
              </div>
            </Info>
          </div>

          <img src="/images/hero.svg" alt="Café do coffee Delivery"/>
        </HeroContent>

        <img src="/images/hero-bg.svg" id="hero-bg" alt=""/>
      </Hero>

      <CoffeList>
        <h2>
          {texts.home.features.AllCoffees}
        </h2>

        <div>
          {coffees.map((coffee) => (
            <Card key={coffee.id} coffee={coffee} />
          ))}
        </div>

      </CoffeList>
    </div>
  )
}