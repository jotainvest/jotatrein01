/* JS bem simples que mantem o ano atualizado nas páginas */
var date = new Date();
var year = date.getFullYear();
$(".footer").append(
  '<img src="https://publifile.s3.amazonaws.com/marca/logo.svg" alt="" class="logoEmpiricus"><p> Jota Treinamentos<br>Você pode cancelar a sua assinatura a qualquer momento. Se optar pelo cancelamento dentro dos primeiros 7 dias, você tem direito a reembolso integral do valor pago. O cancelamento efetuado após o período de 7 dias contados da data da assinatura desobriga a Jota Treinamentos a efetuar reembolsos em relação aos valores já pagos. Consulte a nossa Política de Privacidade e Termos de Uso.</p><p>Copyright © ' +
    year +
    "  - Todos os direitos reservados.</p>"
);
