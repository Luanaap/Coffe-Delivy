import { CurrencyDollar, MapPin, Timer } from '@phosphor-icons/react'
import { useTheme } from 'styled-components'
import { useParams } from 'react-router-dom'

import { useCart } from '../../hooks/useCart'
import { Container, Heading, Info, InfoContent, Order } from './styles'
import { texts } from '../../i18n/pt'

export function Success() {
  const { orders } = useCart()
  const { orderId } = useParams()
  const orderInfo = orders.find((order) => order.id === Number(orderId))
  const paymentMethod = {
    credit: 'Cartão de crédito',
    debit: 'Cartão de débito',
    cash: 'Dinheiro',
  }
  const theme = useTheme()

  if (!orderInfo?.id) {
    return null
  }

  return (
    <Container>
      <Order>
        <Heading>
          <h2>{texts.payment.orderConfirmed}</h2>
          <span>{texts.payment.nowCoffee}</span>
        </Heading>

        <Info>
          <InfoContent>
            <div>
              <MapPin
                color={theme.colors.white}
                style={{ backgroundColor: theme.colors.purple }}
                size={32}
              />

              <div>
                <span>
                  {texts.payment.deliveryIn}{' '}
                  <strong>
                    {orderInfo.street}, {orderInfo.number}
                  </strong>
                </span>

                <span>
                  {orderInfo.neighborhood} - {orderInfo.city},{orderInfo.state}
                </span>
              </div>
            </div>

            <div>
              <Timer
                color={theme.colors.white}
                style={{ backgroundColor: theme.colors.yellow }}
                size={32}
              />

              <div>
                <span>{texts.payment.deliveryForecast}</span>

                <strong>20 min - 30 min</strong>
              </div>
            </div>

            <div>
              <CurrencyDollar
                color={theme.colors.white}
                style={{ backgroundColor: theme.colors['yellow-dark'] }}
                size={32}
              />

              <div>
                <span>{texts.payment.paymentOnDelivery}</span>

                <strong>{paymentMethod[orderInfo.paymentMethod]}</strong>
              </div>
            </div>
          </InfoContent>
        </Info>
      </Order>

      <img src="/images/delivery.svg" alt="Pedido concluído" />
    </Container>
  )
}