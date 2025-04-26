import { useForm, type SubmitHandler } from "react-hook-form";
import { texts } from "../../i18n/pt";
import { AddressContainer, AddressForm, AddressHeading, CartTotal, CartTotalInfo, CheckoutButton, Coffee, CoffeeInfo, Container, InfoContainer, PaymentContainer, PaymentErrorMessage, PaymentHeading, PaymentOptions } from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod'
import { useCart } from "../../hooks/useCart";
import { CreditCard, CurrencyDollar, MapPin, Trash } from "phosphor-react";
import { TextInput } from "../../components/Form/TextInput";
import { Radio } from "../../components/Form/Radio";
import { coffees } from '../../../data.json'
import { Fragment } from "react/jsx-runtime";
import { QuantityInput } from "../../components/Form/QuantityInput";


type FormInputs = {
  cep: string;
  street: string;
  number: number;
  fullAddress: string;
  neighborhood: string;
  city: string;
  state: string;
  paymentMethod: 'credit' | 'debit' | 'cash';
}

const newOrder = z.object({
  cep: z.string().min(1, 'CEP é obrigatório'),
  street: z.string().min(1, 'Informe a rua'),
  number: z.number().min(1, 'Informe o número'),
  fullAddress: z.string(),
  neighborhood: z.string().min(1, 'Informe o bairro'),
  city: z.string().min(1, 'Informe a cidade'),
  state: z.string().min(1, 'Informe a UF'),
  paymentMethod: z.enum(['credit', 'debit', 'cash'], {
    invalid_type_error: 'Informe um método de pagamento',
  }),
})

export type OrderInfo = z.infer<typeof newOrder>

const shippingPrice = 3.5

export function Cart() {

  const {
    cart,
    checkout,
    incrementItemQuantity,
    decrementItemQuantity,
    removeItem
  } = useCart()

  const coffeesInCart = cart.map((item) => {
    const coffeeInfo = coffees.find((coffee) => coffee.id === item.id)

    if (!coffeeInfo) {
      throw new Error('Invalid coffee.')
    }

    return {
      ...coffeeInfo,
      quantity: item.quantity,
    }
  })

  const totalItemsPrice = coffeesInCart.reduce((previousValue, currentItem) => {
    return (previousValue += currentItem.price * currentItem.quantity)
  }, 0)
  

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors},
  } = useForm<FormInputs>({
    resolver: zodResolver(newOrder),
  })

  const selectedPaymentMethod = watch('paymentMethod')

  function handleItemIncrement(itemId: string) {
    incrementItemQuantity(itemId)
  }

  function handleItemDecrement(itemId: string) {
    decrementItemQuantity(itemId)
  }

  function handleItemRemove(itemId: string) {
    removeItem(itemId)
  }

  const handleOrderCheckout: SubmitHandler<FormInputs> = (data) => {
    if (cart.length === 0) {
      return alert(texts.cart.errorCart);
    }

    checkout(data);
  }


  return (
    <Container>
      <InfoContainer>
        <h2>{texts.checkoutText.title}</h2>

        <form id="order" onSubmit={handleSubmit(handleOrderCheckout)}>
          <AddressContainer>
            <AddressHeading>
              <MapPin size={22}/>

              <div>
                <span>
                  {texts.checkoutText.addressSection}
                </span>

                <p>{texts.checkoutText.addressPayment}</p>
              </div>
            </AddressHeading>

            <AddressForm>
              <TextInput
                  placeholder="CEP"
                  type="text"
                  containerProps={{ style: { gridArea: 'cep' } }}
                  error={errors.cep}
                  {...register('cep')}
                  />

              <TextInput
                  placeholder="Rua"
                  containerProps={{ style: { gridArea: 'street' } }}
                  error={errors.street}
                  {...register('street')}
              />

            <TextInput
               placeholder="Número"
               type="number"
               {...register('number', { valueAsNumber: true })}
               error={errors.number}
            />
            </AddressForm>
          </AddressContainer>

          <PaymentContainer>
            <PaymentHeading>
              <CurrencyDollar size={22}/>

              <div>
                <span>
                  {texts.checkoutText.paymentSection}
                </span>

                <p>{texts.checkoutText.FinashPayment}</p>
              </div>
            </PaymentHeading>

            <PaymentOptions>
              <div>
                <Radio
                  isSelected={selectedPaymentMethod === 'credit'}
                  {...register('paymentMethod')}
                  value="credit"
                >
                <CreditCard size={16} />
                  <span>{texts.payment.credit}</span>
                </Radio>

                <Radio
                  isSelected={selectedPaymentMethod === 'debit'}
                  {...register('paymentMethod')}
                  value="debit"
                >
                <CreditCard size={16} />
                  <span>{texts.payment.debit}</span>
                </Radio>

                <Radio
                  isSelected={selectedPaymentMethod === 'cash'}
                  {...register('paymentMethod')}
                  value="cash"
                >
                <CreditCard size={16} />
                  <span>{texts.payment.cash}</span>
                </Radio>
              </div>

              {errors.paymentMethod ? (
                <PaymentErrorMessage role="alert">
                  {errors.paymentMethod.message}
                </PaymentErrorMessage>
              ) : null}
            </PaymentOptions>
          </PaymentContainer>
        </form>
      </InfoContainer>

      <InfoContainer>
        <h2>{texts.selectCoffee.titleCoffee}</h2>

        <CartTotal>
          {coffeesInCart.map((coffee) => (
            <Fragment key={coffee.id}>
              <Coffee>
                <div>
                  <img src={coffee.image} alt={coffee.title} />

                  <div>
                    <span>{coffee.title}</span>

                    <CoffeeInfo>
                      <QuantityInput
                        quantity={coffee.quantity}
                        incrementQuantity={() => handleItemIncrement(coffee.id)}
                        decrementQuantity={() => handleItemDecrement(coffee.id)}
                      />

                      <button onClick={() => handleItemRemove(coffee.id)}>
                        <Trash />
                        <span>{texts.selectCoffee.remove}</span>
                      </button>
                    </CoffeeInfo>
                  </div>
                </div>

                <aside>R$ {coffee.price?.toFixed(2)}</aside>
              </Coffee>

              <span />
            </Fragment>
          ))}

          <CartTotalInfo>
            <div>
              <span>{texts.cart.totalItems}</span>
              <span>
                {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(totalItemsPrice)}
              </span>
            </div>

            <div>
              <span>{texts.checkoutText.Delivery}</span>
              <span>
                {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(shippingPrice)}
              </span>
            </div>

            <div>
              <span>{texts.cart.total}</span>
              <span>
                {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(totalItemsPrice + shippingPrice)}
              </span>
            </div>
          </CartTotalInfo>

          <CheckoutButton type="submit" form="order">
            {texts.cart.confirm}
          </CheckoutButton>
        </CartTotal>
      </InfoContainer>
    </Container>
  )
}
