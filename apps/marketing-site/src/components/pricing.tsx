'use client';

import { useState } from 'react';
import { plans } from '../content/pricing';
import { Signup } from './signup';

const reais = (amount: number) =>
  `R$ ${amount.toLocaleString('pt-BR', {
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;

export function Pricing({ detailed = false }: { detailed?: boolean }) {
  const [annual, setAnnual] = useState(false);
  return (
    <div>
      <div className="section-heading">
        <div>
          <h2>Um plano para cada ritmo</h2>
          <p className="muted">
            7 dias grátis para experimentar. Valores em reais.
          </p>
        </div>
        <div className="billing" role="group" aria-label="Período de cobrança">
          <button aria-pressed={!annual} onClick={() => setAnnual(false)}>
            Mensal
          </button>
          <button
            aria-label="Anual, até 25% de desconto"
            aria-pressed={annual}
            onClick={() => setAnnual(true)}
          >
            Anual <span>até −25%</span>
          </button>
        </div>
      </div>
      <div className="plans" aria-live="polite" aria-atomic="true">
        {plans.map((plan) => (
          <article
            className="panel plan"
            aria-label={plan.name}
            key={plan.name}
          >
            <h3>{plan.name}</h3>
            <p className="amount">
              {reais(annual ? plan.annual / 12 : plan.monthly)}
              <span>/mês</span>
            </p>
            <p className="billing-note">
              {annual
                ? `${reais(plan.annual)} cobrados por ano`
                : 'Cobrança mensal'}
            </p>
            <p className="plan-channels">{plan.channels} canais conectados</p>
            {detailed && (
              <ul className="plan-features">
                <li>Calendário e agendamento</li>
                <li>API pública e MCP</li>
                <li>Assistência de texto com IA</li>
                <li>
                  {plan.team
                    ? 'Colaboração em equipe'
                    : 'Uso individual, sem equipe'}
                </li>
                <li>
                  {plan.images
                    ? `${plan.images} créditos de imagem por mês`
                    : 'Gerador de imagens não incluído'}
                </li>
                <li>{plan.videos} créditos de vídeo por mês</li>
                <li>{plan.webhooks.toLocaleString('pt-BR')} webhooks</li>
              </ul>
            )}
            <Signup />
          </article>
        ))}
      </div>
      <p className="small muted pricing-explanation">
        Um canal é uma conta, perfil ou página conectada. Duas contas na mesma
        rede usam dois canais.
      </p>
      {detailed && (
        <p className="small muted">
          Os planos permitem até 1.000.000 de posts por mês. As redes também
          aplicam seus próprios limites. Geração com IA depende dos provedores
          configurados no Postora e dos créditos disponíveis; alguns formatos de
          vídeo não estão disponíveis no teste grátis.
        </p>
      )}
    </div>
  );
}
