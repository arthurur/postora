export function Signup() {
  return (
    <a className="button" href="https://app.postora.com.br/auth">
      Começar por R$0
    </a>
  );
}

export function TrialOffer() {
  return (
    <div className="trial-offer">
      <Signup />
      <p className="small muted">Teste grátis por 7 dias.</p>
    </div>
  );
}
