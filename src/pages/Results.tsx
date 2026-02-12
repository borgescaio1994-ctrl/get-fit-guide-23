import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { UserProfile, FitnessPlan } from "@/types/fitness";
import { generatePlan } from "@/lib/mockPlan";
import { ArrowLeft, Dumbbell, UtensilsCrossed, ChevronDown, Save, Loader2, LogIn } from "lucide-react";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [plan, setPlan] = useState<FitnessPlan | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const state = location.state as { profile?: UserProfile } | null;
    if (state?.profile) {
      setProfile(state.profile);
      setPlan(generatePlan(state.profile));
    } else {
      navigate("/");
    }
  }, [location.state, navigate]);

  const handleSave = async () => {
    if (!user || !profile || !plan) return;
    setSaving(true);
    const { error } = await supabase.from("user_plans").insert({
      user_id: user.id,
      questionnaire_answers: profile as any,
      generated_plan: plan as any,
    });
    setSaving(false);
    if (error) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
    } else {
      setSaved(true);
      toast({ title: "Plano salvo!", description: "Acesse sua conta para ver seus planos." });
    }
  };

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between p-4 md:p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">Seu Plano</h1>
        </div>
        <div>
          {user ? (
            <Button
              onClick={handleSave}
              disabled={saving || saved}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-accent-foreground font-semibold"
            >
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              {saved ? "Salvo ✓" : "Salvar Plano"}
            </Button>
          ) : (
            <Button variant="outline" onClick={() => navigate("/auth")}>
              <LogIn className="mr-2 h-4 w-4" /> Login para salvar
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 md:p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Calories banner */}
          <div className="mb-6 rounded-xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border border-border/50 p-4 text-center">
            <p className="text-sm text-muted-foreground">Meta diária estimada</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {plan.totalDailyCalories} kcal
            </p>
          </div>

          <Tabs defaultValue="treino" className="w-full">
            <TabsList className="w-full bg-muted/50">
              <TabsTrigger value="treino" className="flex-1 gap-2">
                <Dumbbell className="h-4 w-4" /> Treino
              </TabsTrigger>
              <TabsTrigger value="dieta" className="flex-1 gap-2">
                <UtensilsCrossed className="h-4 w-4" /> Dieta
              </TabsTrigger>
            </TabsList>

            <TabsContent value="treino" className="mt-4 space-y-4">
              {plan.workout.map((day, di) => (
                <motion.div
                  key={di}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: di * 0.1 }}
                  className="rounded-xl border border-border/50 bg-card/50 overflow-hidden"
                >
                  <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border/30">
                    <h3 className="text-xl font-bold">{day.day}</h3>
                    <p className="text-sm text-muted-foreground">{day.muscleGroup}</p>
                  </div>
                  <div className="divide-y divide-border/30">
                    {day.exercises.map((ex, ei) => (
                      <Collapsible key={ei}>
                        <div className="flex items-center gap-4 p-4">
                          <img
                            src={ex.gifUrl}
                            alt={ex.name}
                            className="w-20 h-20 rounded-lg object-cover bg-muted flex-shrink-0"
                            loading="lazy"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm md:text-base">{ex.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {ex.sets}x{ex.reps} · Descanso: {ex.rest}
                            </p>
                          </div>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="icon" className="flex-shrink-0">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent>
                          <div className="px-4 pb-4 pt-0">
                            <p className="text-sm text-muted-foreground bg-muted/30 rounded-lg p-3">
                              💡 {ex.tips}
                            </p>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </div>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="dieta" className="mt-4 space-y-4">
              {plan.diet.map((meal, mi) => (
                <motion.div
                  key={mi}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: mi * 0.1 }}
                  className="rounded-xl border border-border/50 bg-card/50 overflow-hidden"
                >
                  <div className="p-4 bg-gradient-to-r from-accent/10 to-primary/10 border-b border-border/30 flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold">{meal.name}</h3>
                      <p className="text-sm text-muted-foreground">{meal.time}</p>
                    </div>
                    <span className="text-lg font-bold text-primary">{meal.totalCalories} kcal</span>
                  </div>
                  <div className="p-4 space-y-2">
                    {meal.foods.map((food, fi) => (
                      <div key={fi} className="flex justify-between text-sm">
                        <span>{food.item}</span>
                        <span className="text-muted-foreground">{food.quantity} · {food.calories} kcal</span>
                      </div>
                    ))}
                    <div className="pt-2 mt-2 border-t border-border/30 flex gap-4 text-xs text-muted-foreground">
                      <span>🥩 {meal.macros.protein}g prot</span>
                      <span>🍚 {meal.macros.carbs}g carb</span>
                      <span>🥑 {meal.macros.fat}g gord</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}
