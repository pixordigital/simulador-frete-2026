"use client";

import React, { useState, useMemo } from "react";
import { calculateFreight, FreightInputs } from "../utils/calculos";

const InputField = ({ label, value, onChange, name, step = "0.01" }: {
  label: string;
  value: number;
  onChange: (val: number) => void;
  name: string;
  step?: string;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</label>
    <input
      type="number"
      name={name}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      step={step}
      className="bg-white text-foreground px-3 py-2 rounded-md border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
    />
  </div>
);

const ResultCard = ({ label, value, isCurrency = true, highlight = false }: {
  label: string;
  value: number;
  isCurrency?: boolean;
  highlight?: boolean;
}) => (
  <div className={`p-4 rounded-lg ${highlight ? 'bg-primary/10 border border-primary/30' : 'bg-white border border-slate-200 shadow-sm'}`}>
    <span className="text-xs text-slate-500 block mb-1 uppercase tracking-wide font-medium">{label}</span>
    <span className={`text-xl font-bold ${highlight ? 'text-primary' : 'text-foreground'}`}>
      {isCurrency ? `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : value.toLocaleString('pt-BR')}
    </span>
  </div>
);

export default function FreightSimulator() {
  const [inputs, setInputs] = useState<FreightInputs>({
    km: 1000,
    fuelPerKm: 2.5,
    driverCost: 500,
    insurancePercent: 1,
    overhead: 200,
    others: 100,
    tolls: 150,
    ccd: 3.5,
    cc: 100,
    icmsPercent: 12,
    cbsPercent: 8.8,
    ibsPercent: 12,
    profitMarginPercent: 15,
  });

  const handleInputChange = (name: keyof FreightInputs, value: number) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const results = useMemo(() => calculateFreight(inputs), [inputs]);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary/20">
              HR
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                Simulador de Frete <span className="text-accent">2026</span>
              </h1>
              <p className="text-slate-500 text-sm">Otimizado para conformidade ANTT e Tributação Dual (CBS/IBS)</p>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold transition-all ${
            results.isCompliant
              ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
              : 'bg-red-500/10 text-red-600 border border-red-500/20 animate-pulse'
          }`}>
            {results.isCompliant ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                EM CONFORMIDADE ANTT
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-red-500" />
                ABAIXO DO PISO ANTT
              </>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Sections */}
          <div className="lg:col-span-2 space-y-6">
            <section className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full" />
                Custos Operacionais
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Combustível /km" value={inputs.fuelPerKm} onChange={(v) => handleInputChange('fuelPerKm', v)} name="fuelPerKm" />
                <InputField label="Motorista (R$)" value={inputs.driverCost} onChange={(v) => handleInputChange('driverCost', v)} name="driverCost" />
                <InputField label="Seguro (%)" value={inputs.insurancePercent} onChange={(v) => handleInputChange('insurancePercent', v)} name="insurancePercent" />
                <InputField label="Overhead (R$)" value={inputs.overhead} onChange={(v) => handleInputChange('overhead', v)} name="overhead" />
                <InputField label="Outros (R$)" value={inputs.others} onChange={(v) => handleInputChange('others', v)} name="others" />
              </div>
            </section>

            <section className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full" />
                Rota e Logística
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Km Total" value={inputs.km} onChange={(v) => handleInputChange('km', v)} name="km" step="1" />
                <InputField label="Pedágios (R$)" value={inputs.tolls} onChange={(v) => handleInputChange('tolls', v)} name="tolls" />
              </div>
            </section>

            <section className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full" />
                Regras Fiscais e ANTT
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="ANTT CCD (R$/km)" value={inputs.ccd} onChange={(v) => handleInputChange('ccd', v)} name="ccd" />
                <InputField label="ANTT CC (R$)" value={inputs.cc} onChange={(v) => handleInputChange('cc', v)} name="cc" />
                <InputField label="ICMS (%)" value={inputs.icmsPercent} onChange={(v) => handleInputChange('icmsPercent', v)} name="icmsPercent" />
                <InputField label="CBS (%)" value={inputs.cbsPercent} onChange={(v) => handleInputChange('cbsPercent', v)} name="cbsPercent" />
                <InputField label="IBS (%)" value={inputs.ibsPercent} onChange={(v) => handleInputChange('ibsPercent', v)} name="ibsPercent" />
                <InputField label="Margem Lucro (%)" value={inputs.profitMarginPercent} onChange={(v) => handleInputChange('profitMarginPercent', v)} name="profitMarginPercent" />
              </div>
            </section>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm sticky top-8">
              <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full" />
                Resumo Financeiro
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <ResultCard label="Custo Operacional Total" value={results.totalCost} />
                <ResultCard label="Piso Mínimo ANTT" value={results.anttFloor} />
                <ResultCard label="Margem de Lucro" value={results.profitTotal} />
                <ResultCard label="Impostos Totais" value={results.taxTotal} />

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <ResultCard
                    label="Preço Final (com pedágio)"
                    value={results.finalPrice}
                    highlight
                  />
                  <div className="mt-4 p-3 rounded bg-slate-100 text-[10px] text-slate-500 leading-relaxed font-medium">
                    Cálculo baseado na Lei 10209/2001. <br/>
                    O pedágio é somado ao valor final, fora da base de cálculo de impostos e margem.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
