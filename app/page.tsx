"use client";

import React, { useState, useMemo } from "react";
import { calculateFreight, FreightInputs } from "../utils/calculos";
import {
  Calculator,
  Settings,
  User,
  Bell,
  LayoutDashboard,
  History,
  FileText,
  HelpCircle,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const InputField = ({ label, value, onChange, name, step = "0.01" }: {
  label: string;
  value: number;
  onChange: (val: number) => void;
  name: string;
  step?: string;
}) => (
  <div className="flex flex-col gap-2 group">
    <Label className="text-slate-500 text-[11px] font-bold uppercase tracking-wider group-focus-within:text-primary transition-colors">
      {label}
    </Label>
    <Input
      type="number"
      name={name}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      step={step}
      className="bg-slate-50/50 focus:bg-white transition-all shadow-sm"
    />
  </div>
);

const ResultCard = ({ label, value, isCurrency = true, highlight = false }: {
  label: string;
  value: number;
  isCurrency?: boolean;
  highlight?: boolean;
}) => (
  <Card className={`transition-all duration-300 ${highlight
    ? 'bg-primary text-primary-foreground shadow-lg ring-2 ring-accent'
    : 'bg-white hover:border-primary/50'}`}>
    <CardContent className="p-4">
      <span className={`text-[10px] block mb-1 uppercase tracking-widest font-bold ${highlight ? 'text-primary-foreground/70' : 'text-slate-400'}`}>
        {label}
      </span>
      <span className={`text-2xl font-black tracking-tight ${highlight ? 'text-white' : 'text-foreground'}`}>
        {isCurrency ? `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : value.toLocaleString('pt-BR')}
      </span>
    </CardContent>
  </Card>
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
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const results = useMemo(() => calculateFreight(inputs), [inputs]);

  return (
    <div className="min-h-screen bg-slate-50 text-foreground font-sans flex selection:bg-primary/20">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 bg-slate-900 text-white flex-col sticky top-0 h-screen transition-all">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-primary-dark font-black text-xl shadow-lg shadow-accent/30">
              HR
            </div>
            <span className="text-lg font-black uppercase tracking-tighter leading-none">HR Cargo</span>
          </div>
          <nav className="space-y-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-3">Menu Principal</div>
            {[
              { icon: LayoutDashboard, label: 'Dashboard', active: false },
              { icon: Calculator, label: 'Simulador', active: true },
              { icon: History, label: 'Histórico', active: false },
              { icon: FileText, label: 'Relatórios', active: false },
            ].map((item) => (
              <a
                key={item.label}
                href="#"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  item.active ? 'bg-accent text-primary-dark shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-slate-800 space-y-1">
          {[
            { icon: Settings, label: 'Configurações' },
            { icon: HelpCircle, label: 'Suporte' },
          ].map((item) => (
            <a
              key={item.label}
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </a>
          ))}
          <div className="pt-4 mt-4 border-t border-slate-800 flex items-center gap-3 px-3 py-2 rounded-lg">
            <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-xs font-bold text-slate-300">
              JS
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">João Silva</p>
              <p className="text-[10px] text-slate-500 truncate">Administrador</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="lg:hidden w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black text-sm">
              HR
            </div>
            <h1 className="text-sm font-bold text-slate-600 uppercase tracking-wide">
              Simulador de Frete <span className="text-primary font-black">2026</span>
            </h1>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-black text-foreground tracking-tight">Cálculo de Frete</h2>
                <p className="text-slate-500 text-xs font-medium">Defina os parâmetros operacionais e fiscais para obter a cotação final.</p>
              </div>
              <Badge variant="outline"
                       className={`px-4 py-1.5 text-xs font-black uppercase tracking-widest transition-all ${
                         results.isCompliant
                           ? 'bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200'
                           : 'bg-red-100 text-red-700 border-red-200 animate-pulse hover:bg-red-200'
                       }`}>
                {results.isCompliant ? <CheckCircle2 className="w-3 h-3 mr-2" /> : <AlertCircle className="w-3 h-3 mr-2" />}
                {results.isCompliant ? 'EM CONFORMIDADE ANTT' : 'ABAIXO DO PISO ANTT'}
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <div className="w-1 h-4 bg-primary rounded-full" />
                      Custos Operacionais
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <InputField label="Combustível /km" value={inputs.fuelPerKm} onChange={(v) => handleInputChange('fuelPerKm', v)} name="fuelPerKm" />
                      <InputField label="Motorista (R$)" value={inputs.driverCost} onChange={(v) => handleInputChange('driverCost', v)} name="driverCost" />
                      <InputField label="Seguro (%)" value={inputs.insurancePercent} onChange={(v) => handleInputChange('insurancePercent', v)} name="insurancePercent" />
                    </div>
                    <div className="space-y-4">
                      <InputField label="Overhead (R$)" value={inputs.overhead} onChange={(v) => handleInputChange('overhead', v)} name="overhead" />
                      <InputField label="Outros (R$)" value={inputs.others} onChange={(v) => handleInputChange('others', v)} name="others" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <div className="w-1 h-4 bg-primary rounded-full" />
                      Rota e Logística
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <InputField label="Km Total" value={inputs.km} onChange={(v) => handleInputChange('km', v)} name="km" step="1" />
                      <InputField label="Pedágios (R$)" value={inputs.tolls} onChange={(v) => handleInputChange('tolls', v)} name="tolls" />
                    </div>
                    <div className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 italic leading-relaxed">
                      Cálculo baseado na Lei 10209/2001. Pedágios são somados ao valor final, fora da base de impostos.
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <div className="w-1 h-4 bg-primary rounded-full" />
                      Parâmetros Fiscais e ANTT
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <InputField label="ANTT CCD (R$/km)" value={inputs.ccd} onChange={(v) => handleInputChange('ccd', v)} name="ccd" />
                      <InputField label="ANTT CC (R$)" value={inputs.cc} onChange={(v) => handleInputChange('cc', v)} name="cc" />
                    </div>
                    <div className="space-y-4">
                      <InputField label="ICMS (%)" value={inputs.icmsPercent} onChange={(v) => handleInputChange('icmsPercent', v)} name="icmsPercent" />
                      <InputField label="CBS (%)" value={inputs.cbsPercent} onChange={(v) => handleInputChange('cbsPercent', v)} name="cbsPercent" />
                    </div>
                    <div className="space-y-4">
                      <InputField label="IBS (%)" value={inputs.ibsPercent} onChange={(v) => handleInputChange('ibsPercent', v)} name="ibsPercent" />
                      <InputField label="Margem Lucro (%)" value={inputs.profitMarginPercent} onChange={(v) => handleInputChange('profitMarginPercent', v)} name="profitMarginPercent" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="sticky top-24 border-primary/20 shadow-md">
                  <CardHeader className="flex flex-row items-center gap-2">
                    <Calculator className="w-5 h-5 text-primary" />
                    <CardTitle className="text-sm font-black">Resumo Financeiro</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 gap-4">
                    <ResultCard label="Custo Operacional Total" value={results.totalCost} />
                    <ResultCard label="Piso Mínimo ANTT" value={results.anttFloor} />
                    <ResultCard label="Margem de Lucro" value={results.profitTotal} />
                    <ResultCard label="Impostos Totais" value={results.taxTotal} />
                    <Separator className="my-4" />
                    <ResultCard
                      label="Preço Final (com pedágio)"
                      value={results.finalPrice}
                      highlight
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
