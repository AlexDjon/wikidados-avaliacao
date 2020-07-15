import * as yup from 'yup';

/* Validação de dados */
export default {
  create: yup.object().shape(
  {
    email: yup
      .string()
      .email("O E-mail é inválido!")
      .required("Você precisa inserir um E-mail"),
    first_name: yup
      .string()
      .min(3, "O Nome precisa ter no mínimo 3 caractéres")
      .max(20, "O Nome pode ter no máximo 20 caractéres")
      .required("Você precisa inserir um Nome"),
    last_name: yup
      .string()
      .min(3, "O Sobrenome precisa ter no mínimo 3 caractéres")
      .max(20, "O Sobrenome precisa ter no máximo 20 caractéres")
      .required("Você precisa inserir um Sobrenome"),
    avatar: yup
      .string()
      .url("Url do Avatar é inválida")
      .max(300, "A Url do Avatar só pode ter no máximo 300 caractéres")
  })
}