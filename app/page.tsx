"use client";

import React, { useState, useMemo } from "react";
import { calculateFreight, FreightInputs } from "../utils/calculos";
import { Menu, X, Phone, Mail, MapPin, Calculator, ArrowRight, Sparkles } from "lucide-react";

const InputField = ({ label, value, onChange, name, step = "0.01" }: {
  label: string;
  value: number;
  onChange: (val: number) => void;
  name: string;
  step?: string;
}) => (
  <div className="flex flex-col gap-1.5 group">
    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest transition-colors group-focus-within:text-primary">{label}</label>
    <input
      type="number"
      name={name}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      step={step}
      className="bg-white/50 text-foreground px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm text-sm backdrop-blur-sm"
    />
  </div>
);

const ResultCard = ({ label, value, isCurrency = true, highlight = false }: {
  label: string;
  value: number;
  isCurrency?: boolean;
  highlight?: boolean;
}) => (
  <div className={`p-5 rounded-2xl transition-all duration-300 ${highlight
    ? 'bg-gradient-to-br from-primary to-primary-dark text-white shadow-xl shadow-primary/40 scale-105 ring-1 ring-white/20'
    : 'bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm hover:shadow-md'}`}>
    <span className={`text-[10px] block mb-1 uppercase tracking-widest font-black ${highlight ? 'text-blue-200' : 'text-slate-400'}`}>{label}</span>
    <span className={`text-2xl font-black tracking-tight ${highlight ? 'text-white' : 'text-foreground'}`}>
      {isCurrency ? `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : value.toLocaleString('pt-BR')}
    </span>
  </div>
);

export default function FreightSimulator() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const results = useMemo(() => calculateFreight(inputs), [inputs]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col selection:bg-primary/20">
      <nav className="bg-white/70 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-primary/30 group-hover:rotate-3 transition-transform">
                HR
              </div>
              <div className="hidden md:block">
                <span className="text-xl font-black text-primary uppercase tracking-tighter block leading-none">HR Cargo</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-tight">Logística Integrada</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {['HOME', 'QUEM SOMOS', 'SERVIÇOS', 'CONTATO'].map((item) => (
                <a key={item} href="#" className="text-xs font-black text-slate-500 hover:text-primary uppercase tracking-widest transition-colors relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </a>
              ))}
              <button className="bg-accent hover:bg-accent-dark text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:-translate-y-0.5 active:translate-y-0">
                Cotação Online
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-2xl border-t border-slate-100 p-4 space-y-2 shadow-2xl animate-in slide-in-from-top duration-300">
            {['HOME', 'QUEM SOMOS', 'SERVIÇOS', 'CONTATO'].map((item) => (
              <a key={item} href="#" className="block text-xs font-black text-slate-600 p-3 hover:bg-slate-50 rounded-xl transition-colors uppercase tracking-widest">{item}</a>
            ))}
            <button className="w-full bg-accent text-white p-4 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-accent/20">Cotação Online</button>
          </div>
        )}
      </nav>

      <div className="bg-primary text-white py-16 px-4 relative overflow-hidden shadow-inner">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/20 to-transparent skew-x-12 translate-x-20" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-blue-100 text-[10px] font-bold uppercase tracking-widest mb-6 ring-1 ring-white/20">
              <Sparkles className="w-3 h-3" />
              Inteligência em Fretes
            </div>
            <h2 className="text-5xl font-black leading-tight mb-6 tracking-tight">
              Simulador de <span className="text-accent relative inline-block">Frete 2026
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-accent/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" strokeLinecap="round"/></svg>
              </span>
            </h2>
            <p className="text-blue-100 max-w-xl text-lg font-medium opacity-80 leading-relaxed">
              Cálculos de alta precisão com conformidade total ANTT e a nova estrutura de Tributação Dual (CBS/IBS).
            </p>
          </div>
          <div className={`px-8 py-4 rounded-2xl flex items-center gap-4 text-sm font-black uppercase tracking-widest transition-all ${
            results.isCompliant
              ? 'bg-emerald-400 text-emerald-900 shadow-2xl shadow-emerald-400/40 ring-4 ring-emerald-400/20'
              : 'bg-red-400 text-red-900 shadow-2xl shadow-red-400/40 ring-4 ring-red-400/20 animate-pulse'
          }`}>
            <span className="w-3 h-3 rounded-full bg-current ring-4 ring-current/30" />
            {results.isCompliant ? 'EM CONFORMIDADE ANTT' : 'ABAIXO DO PISO ANTT'}
          </div>
        </div>
      </div>

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300">
                  <h3 className="text-lg font-black text-foreground mb-8 flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-primary rounded-full" />
                    Custos Operacionais
                  </h3>
                  <div className="space-y-6">
                    <InputField label="Combustível /km" value={inputs.fuelPerKm} onChange={(v) => handleInputChange('fuelPerKm', v)} name="fuelPerKm" />
                    <InputField label="Motorista (R$)" value={inputs.driverCost} onChange={(v) => handleInputChange('driverCost', v)} name="driverCost" />
                    <InputField label="Seguro (%)" value={inputs.insurancePercent} onChange={(v) => handleInputChange('insurancePercent', v)} name="insurancePercent" />
                    <InputField label="Overhead (R$)" value={inputs.overhead} onChange={(v) => handleInputChange('overhead', v)} name="overhead" />
                    <InputField label="Outros (R$)" value={inputs.others} onChange={(v) => handleInputChange('others', v)} name="others" />
                  </div>
                </section>

                <section className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300">
                  <h3 className="text-lg font-black text-foreground mb-8 flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-primary rounded-full" />
                    Rota e Logística
                  </h3>
                  <div className="space-y-6">
                    <InputField label="Km Total" value={inputs.km} onChange={(v) => handleInputChange('km', v)} name="km" step="1" />
                    <InputField label="Pedágios (R$)" value={inputs.tolls} onChange={(v) => handleInputChange('tolls', v)} name="tolls" />
                    <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-xs text-slate-500 italic font-medium">
                      Lembre-se: pedágios são somados ao final, sem incidência de impostos.
                    </div>
                  </div>
                </section>
              </div>

              <section className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300">
                <h3 className="text-lg font-black text-foreground mb-8 flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-primary rounded-full" />
                  Regras Fiscais e ANTT
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InputField label="ANTT CCD (R$/km)" value={inputs.ccd} onChange={(v) => handleInputChange('ccd', v)} name="ccd" />
                  <InputField label="ANTT CC (R$)" value={inputs.cc} onChange={(v) => handleInputChange('cc', v)} name="cc" />
                  <InputField label="ICMS (%)" value={inputs.icmsPercent} onChange={(v) => handleInputChange('icmsPercent', v)} name="icmsPercent" />
                  <InputField label="CBS (%)" value={inputs.cbsPercent} onChange={(v) => handleInputChange('cbsPercent', v)} name="cbsPercent" />
                  <InputField label="IBS (%)" value={inputs.ibsPercent} onChange={(v) => handleInputChange('ibsPercent', v)} name="ibsPercent" />
                  <InputField label="Margem Lucro (%)" value={inputs.profitMarginPercent} onChange={(v) => handleInputChange('profitMarginPercent', v)} name="profitMarginPercent" />
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-slate-200/50 sticky top-28">
                <h3 className="text-xl font-black text-foreground mb-8 flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calculator className="text-primary w-6 h-6" />
                  </div>
                  Resumo Financeiro
                </h3>

                <div className="grid grid-cols-1 gap-5">
                  <ResultCard label="Custo Operacional Total" value={results.totalCost} />
                  <ResultCard label="Piso Mínimo ANTT" value={results.anttFloor} />
                  <ResultCard label="Margem de Lucro" value={results.profitTotal} />
                  <ResultCard label="Impostos Totais" value={results.taxTotal} />

                  <div className="mt-8 pt-8 border-t border-slate-100">
                    <ResultCard
                      label="Preço Final (com pedágio)"
                      value={results.finalPrice}
                      highlight
                    />
                    <div className="mt-6 p-5 rounded-2xl bg-slate-50 text-[11px] text-slate-500 leading-relaxed font-medium border border-slate-200 group hover:bg-slate-100 transition-colors cursor-default">
                      Cálculo baseado na <strong className="text-slate-700">Lei 10209/2001</strong>. <br/>
                      O valor do pedágio é somado ao custo final, excluindo-se da base de cálculo de impostos e margem de lucro.
                    </div>
                  </div >
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 text-white py-16 px-4 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl">
                HR
              </div>
              <span className="text-lg font-black uppercase tracking-tighter">HR Cargo</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed opacity-80">
              Soluções inteligentes em logística e transporte, focadas em eficiência, conformidade e transparência.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase text-accent tracking-widest">Links</h4>
              <ul className="text-slate-400 text-sm space-y-3">
                <li><a href="#" className="hover:text-white transition-all flex items-center gap-2 group">Home <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" /></a></li>
                <li><a href="#" className="hover:text-white transition-all flex items-center gap-2 group">Quem Somos <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" /></a></li>
                <li><a href="#" className="hover:text-white transition-all flex items-center gap-2 group">Serviços <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" /></a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase text-accent tracking-widest">Suporte</h4>
              <ul className="text-slate-400 text-sm space-y-3">
                <li><a href="#" className="hover:text-white transition-all flex items-center gap-2 group">FAQ <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" /></a></li>
                <li><a href="#" className="hover:text-white transition-all flex items-center gap-2 group">Cotações <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" /></a></li>
                <li><a href="#" className="hover:text-white transition-all flex items-center gap-2 group">Contato <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" /></a></li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase text-accent tracking-widest">Contato</h4>
            <div className="space-y-4 text-slate-400 text-sm">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-primary transition-colors">
                  <Phone className="w-4 h-4 text-primary group-hover:text-white" />
                </div>
                <span className="group-hover:text-white transition-colors">(11) 0000-0000</span>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-primary transition-colors">
                  <Mail className="w-4 h-4 text-primary group-hover:text-white" />
                </div>
                <span className="group-hover:text-white transition-colors">contato@hrcargo.com.br</span>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-primary transition-colors">
                  <MapPin className="w-4 h-4 text-primary group-hover:text-white" />
                </div>
                <span className="group-hover:text-white transition-colors">São Paulo, SP - Brasil</span>
              </div>
            </div>
          </div >
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-[10px] uppercase tracking-widest">
          © 2026 HR Cargo Logística Integrada. Todos os direitos reservados.
        </div>
      </footer >
    </div>
  );
}
