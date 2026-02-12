import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { UserProfile } from "@/types/fitness";
import { ArrowLeft, ArrowRight, Dumbbell } from "lucide-react";

const goals = [
  { value: "massa", label: "💪 Ganho de Massa", desc: "Aumentar músculo e força" },
  { value: "emagrecimento", label: "🔥 Emagrecimento", desc: "Perder gordura e definir" },
  { value: "condicionamento", label: "⚡ Condicionamento", desc: "Melhorar resistência geral" },
  { value: "definicao", label: "🎯 Definição", desc: "Manter massa e reduzir gordura" },
];

const experiences = [
  { value: "iniciante", label: "🌱 Iniciante", desc: "Menos de 6 meses" },
  { value: "intermediario", label: "💪 Intermediário", desc: "6 meses a 2 anos" },
  { value: "avancado", label: "🏆 Avançado", desc: "Mais de 2 anos" },
];

const dietaryOptions = ["Vegetariano", "Vegano", "Sem glúten", "Sem lactose", "Low carb", "Nenhuma"];
const injuryOptions = ["Joelho", "Coluna", "Ombro", "Punho", "Nenhuma"];

const TOTAL_STEPS = 6;

export default function Questionnaire() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    goal: "",
    sex: "",
    age: 25,
    weight: 70,
    height: 170,
    experience: "",
    frequency: 3,
    dietaryRestrictions: [],
    injuries: [],
  });

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  const update = (field: string, value: any) =>
    setProfile((p) => ({ ...p, [field]: value }));

  const toggleArray = (field: "dietaryRestrictions" | "injuries", value: string) => {
    const arr = profile[field] || [];
    if (value === "Nenhuma") {
      update(field, ["Nenhuma"]);
    } else {
      const filtered = arr.filter((v) => v !== "Nenhuma");
      update(field, filtered.includes(value) ? filtered.filter((v) => v !== value) : [...filtered, value]);
    }
  };

  const canNext = () => {
    switch (step) {
      case 0: return !!profile.goal;
      case 1: return !!profile.sex && profile.age! > 0 && profile.weight! > 0 && profile.height! > 0;
      case 2: return !!profile.experience;
      case 3: return profile.frequency! >= 2 && profile.frequency! <= 7;
      case 4: return (profile.dietaryRestrictions?.length || 0) > 0;
      case 5: return (profile.injuries?.length || 0) > 0;
      default: return false;
    }
  };

  const handleFinish = () => {
    const fullProfile = profile as UserProfile;
    navigate("/resultado", { state: { profile: fullProfile } });
  };

  const OptionCard = ({ selected, onClick, label, desc }: { selected: boolean; onClick: () => void; label: string; desc: string }) => (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl border text-left transition-all ${
        selected
          ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
          : "border-border/50 bg-card/50 hover:border-primary/50"
      }`}
    >
      <span className="text-lg font-semibold block">{label}</span>
      <span className="text-sm text-muted-foreground">{desc}</span>
    </button>
  );

  const ChipToggle = ({ selected, onClick, label }: { selected: boolean; onClick: () => void; label: string }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
        selected
          ? "border-primary bg-primary/20 text-primary"
          : "border-border/50 bg-card/30 text-muted-foreground hover:border-primary/50"
      }`}
    >
      {label}
    </button>
  );

  const steps = [
    // Step 0: Goal
    <div className="space-y-4">
      <h2 className="text-3xl md:text-4xl font-bold">Qual seu objetivo?</h2>
      <p className="text-muted-foreground">Escolha o que mais se encaixa no seu momento</p>
      <div className="grid gap-3 mt-6">
        {goals.map((g) => (
          <OptionCard key={g.value} selected={profile.goal === g.value} onClick={() => update("goal", g.value)} label={g.label} desc={g.desc} />
        ))}
      </div>
    </div>,

    // Step 1: Personal data
    <div className="space-y-4">
      <h2 className="text-3xl md:text-4xl font-bold">Seus dados</h2>
      <p className="text-muted-foreground">Precisamos disso para personalizar seu plano</p>
      <div className="grid grid-cols-2 gap-3 mt-6">
        {[
          { value: "masculino", label: "♂️ Masculino" },
          { value: "feminino", label: "♀️ Feminino" },
        ].map((s) => (
          <button key={s.value} onClick={() => update("sex", s.value)}
            className={`p-4 rounded-xl border text-center font-semibold transition-all ${
              profile.sex === s.value ? "border-primary bg-primary/10" : "border-border/50 bg-card/50"
            }`}>
            {s.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div><Label>Idade</Label><Input type="number" value={profile.age} onChange={(e) => update("age", +e.target.value)} /></div>
        <div><Label>Peso (kg)</Label><Input type="number" value={profile.weight} onChange={(e) => update("weight", +e.target.value)} /></div>
        <div><Label>Altura (cm)</Label><Input type="number" value={profile.height} onChange={(e) => update("height", +e.target.value)} /></div>
      </div>
    </div>,

    // Step 2: Experience
    <div className="space-y-4">
      <h2 className="text-3xl md:text-4xl font-bold">Seu nível</h2>
      <p className="text-muted-foreground">Qual sua experiência na academia?</p>
      <div className="grid gap-3 mt-6">
        {experiences.map((e) => (
          <OptionCard key={e.value} selected={profile.experience === e.value} onClick={() => update("experience", e.value)} label={e.label} desc={e.desc} />
        ))}
      </div>
    </div>,

    // Step 3: Frequency
    <div className="space-y-4">
      <h2 className="text-3xl md:text-4xl font-bold">Quantos dias?</h2>
      <p className="text-muted-foreground">Quantos dias por semana pode treinar?</p>
      <div className="flex gap-3 mt-6 justify-center flex-wrap">
        {[2, 3, 4, 5, 6].map((d) => (
          <button key={d} onClick={() => update("frequency", d)}
            className={`w-16 h-16 rounded-xl border text-xl font-bold transition-all ${
              profile.frequency === d ? "border-primary bg-primary/10 text-primary" : "border-border/50 bg-card/50"
            }`}>
            {d}x
          </button>
        ))}
      </div>
    </div>,

    // Step 4: Dietary
    <div className="space-y-4">
      <h2 className="text-3xl md:text-4xl font-bold">Restrições alimentares</h2>
      <p className="text-muted-foreground">Selecione o que se aplica</p>
      <div className="flex flex-wrap gap-3 mt-6">
        {dietaryOptions.map((d) => (
          <ChipToggle key={d} selected={profile.dietaryRestrictions?.includes(d) || false} onClick={() => toggleArray("dietaryRestrictions", d)} label={d} />
        ))}
      </div>
    </div>,

    // Step 5: Injuries
    <div className="space-y-4">
      <h2 className="text-3xl md:text-4xl font-bold">Lesões ou limitações</h2>
      <p className="text-muted-foreground">Algo que devemos considerar?</p>
      <div className="flex flex-wrap gap-3 mt-6">
        {injuryOptions.map((inj) => (
          <ChipToggle key={inj} selected={profile.injuries?.includes(inj) || false} onClick={() => toggleArray("injuries", inj)} label={inj} />
        ))}
      </div>
    </div>,
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="flex items-center gap-3 p-4 md:p-6">
        <Button variant="ghost" size="icon" onClick={() => step > 0 ? setStep(step - 1) : navigate("/")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <Progress value={progress} className="h-2" />
        </div>
        <span className="text-sm text-muted-foreground font-medium">{step + 1}/{TOTAL_STEPS}</span>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {steps[step]}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <footer className="p-4 md:p-6">
        <Button
          onClick={() => (step < TOTAL_STEPS - 1 ? setStep(step + 1) : handleFinish())}
          disabled={!canNext()}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-bold py-6 rounded-xl text-lg"
        >
          {step < TOTAL_STEPS - 1 ? (
            <>Próximo <ArrowRight className="ml-2 h-5 w-5" /></>
          ) : (
            <>Gerar Meu Plano <Dumbbell className="ml-2 h-5 w-5" /></>
          )}
        </Button>
      </footer>
    </div>
  );
}
