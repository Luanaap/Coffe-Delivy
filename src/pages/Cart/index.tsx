import { useForm, type SubmitHandler } from "react-hook-form";
import { texts } from "../../i18n/pt";
import { AddressContainer, AddressForm, AddressHeading, Container, InfoContainer } from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod'
import { useCart } from "../../hooks/useCart";
import { MapPin } from "phosphor-react";
import { TextInput } from "../../components/Form/TextInput";

type FormInputs = {
  cep: number;
  street: string;
  number: number;
  fullAddress: string;
  neighborhood: string;
  city: string;
  state: string;
  paymentMethod: 'credit' | 'debit' | 'cash';
}

const newOrder = z.object({
  cep: z.number({ invalid_type_error: 'CEP é obrigatório' }),
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


export function Cart() {

  const {
    cart,
    checkout
  } = useCart()
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(newOrder),
  })


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
                  type="number"
                  containerProps={{ style: { gridArea: 'cep' } }}
                  error={errors.cep}
                  {...register('cep', { valueAsNumber: true })}
               />

              <TextInput
                  placeholder="Rua"
                  containerProps={{ style: { gridArea: 'street' } }}
                  error={errors.street}
                  {...register('street')}
              />

            <TextInput
                placeholder="Número"
                containerProps={{ style: { gridArea: 'number' } }}
                error={errors.number}
                {...register('number')}
            />
            </AddressForm>
          </AddressContainer>

        </form>
      </InfoContainer>
    </Container>
  )
}
