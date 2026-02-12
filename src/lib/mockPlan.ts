import { UserProfile, FitnessPlan, WorkoutDay, Meal } from "@/types/fitness";

const exerciseGifs: Record<string, string> = {
  "Supino Reto": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bench-Press.gif",
  "Supino Inclinado": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Barbell-Bench-Press.gif",
  "Crucifixo": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Fly.gif",
  "Tríceps Pulley": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif",
  "Tríceps Testa": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Lying-Triceps-Extension.gif",
  "Agachamento Livre": "https://fitnessprogramer.com/wp-content/uploads/2021/02/BARBELL-SQUAT.gif",
  "Leg Press": "https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-PRESS.gif",
  "Cadeira Extensora": "https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif",
  "Mesa Flexora": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Leg-Curl.gif",
  "Panturrilha": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Standing-Calf-Raise.gif",
  "Puxada Frontal": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif",
  "Remada Curvada": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bent-Over-Row.gif",
  "Remada Baixa": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Cable-Row.gif",
  "Rosca Direta": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif",
  "Rosca Alternada": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Alternate-Dumbbell-Curl.gif",
  "Desenvolvimento": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shoulder-Press.gif",
  "Elevação Lateral": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif",
  "Elevação Frontal": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Front-Raise.gif",
  "Abdominal Crunch": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Crunch.gif",
  "Prancha": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Front-Plank.gif",
};

function getExercise(name: string, sets: number, reps: string, rest: string, tips: string) {
  return {
    name,
    sets,
    reps,
    rest,
    gifUrl: exerciseGifs[name] || "https://fitnessprogramer.com/wp-content/uploads/2021/02/Crunch.gif",
    tips,
  };
}

export function generatePlan(profile: UserProfile): FitnessPlan {
  const isHypertrophy = profile.goal === "massa" || profile.goal === "definicao";
  const isLoss = profile.goal === "emagrecimento";
  const sets = profile.experience === "iniciante" ? 3 : 4;
  const reps = isHypertrophy ? "8-12" : isLoss ? "12-15" : "10-12";
  const rest = isHypertrophy ? "60-90s" : "45-60s";

  const workoutTemplates: Record<number, WorkoutDay[]> = {
    3: [
      {
        day: "Segunda", muscleGroup: "Peito + Tríceps",
        exercises: [
          getExercise("Supino Reto", sets, reps, rest, "Mantenha as escápulas retraídas."),
          getExercise("Supino Inclinado", sets, reps, rest, "Inclinação de 30-45 graus."),
          getExercise("Crucifixo", 3, reps, rest, "Controle a descida dos halteres."),
          getExercise("Tríceps Pulley", sets, reps, rest, "Cotovelos fixos ao lado do corpo."),
          getExercise("Tríceps Testa", 3, reps, rest, "Desça a barra até a testa."),
        ],
      },
      {
        day: "Quarta", muscleGroup: "Costas + Bíceps",
        exercises: [
          getExercise("Puxada Frontal", sets, reps, rest, "Puxe até a altura do peito."),
          getExercise("Remada Curvada", sets, reps, rest, "Costas retas, puxe para o abdômen."),
          getExercise("Remada Baixa", sets, reps, rest, "Mantenha o tronco ereto."),
          getExercise("Rosca Direta", sets, reps, rest, "Não balance o corpo."),
          getExercise("Rosca Alternada", 3, reps, rest, "Supine ao subir o halter."),
        ],
      },
      {
        day: "Sexta", muscleGroup: "Pernas + Ombros",
        exercises: [
          getExercise("Agachamento Livre", sets, reps, rest, "Desça até 90 graus."),
          getExercise("Leg Press", sets, reps, rest, "Não trave os joelhos."),
          getExercise("Cadeira Extensora", 3, reps, rest, "Contraia o quadríceps no topo."),
          getExercise("Mesa Flexora", 3, reps, rest, "Controle o movimento."),
          getExercise("Desenvolvimento", sets, reps, rest, "Não ultrapasse a linha das orelhas."),
          getExercise("Elevação Lateral", 3, reps, rest, "Cotovelos levemente flexionados."),
        ],
      },
    ],
    4: [
      {
        day: "Segunda", muscleGroup: "Peito + Tríceps",
        exercises: [
          getExercise("Supino Reto", sets, reps, rest, "Escápulas retraídas, peito alto."),
          getExercise("Supino Inclinado", sets, reps, rest, "30-45 graus de inclinação."),
          getExercise("Crucifixo", 3, reps, rest, "Amplitude controlada."),
          getExercise("Tríceps Pulley", sets, reps, rest, "Cotovelos fixos."),
          getExercise("Tríceps Testa", 3, reps, rest, "Movimento lento na descida."),
        ],
      },
      {
        day: "Terça", muscleGroup: "Costas + Bíceps",
        exercises: [
          getExercise("Puxada Frontal", sets, reps, rest, "Puxe para o peito."),
          getExercise("Remada Curvada", sets, reps, rest, "Costas retas."),
          getExercise("Remada Baixa", sets, reps, rest, "Tronco ereto."),
          getExercise("Rosca Direta", sets, reps, rest, "Sem balançar."),
          getExercise("Rosca Alternada", 3, reps, rest, "Supinação no topo."),
        ],
      },
      {
        day: "Quinta", muscleGroup: "Pernas",
        exercises: [
          getExercise("Agachamento Livre", sets, reps, rest, "Desça até 90°."),
          getExercise("Leg Press", sets, reps, rest, "Não trave joelhos."),
          getExercise("Cadeira Extensora", 3, reps, rest, "Contraia no topo."),
          getExercise("Mesa Flexora", 3, reps, rest, "Controle o negativo."),
          getExercise("Panturrilha", 4, "15-20", rest, "Amplitude total."),
        ],
      },
      {
        day: "Sábado", muscleGroup: "Ombros + Abdômen",
        exercises: [
          getExercise("Desenvolvimento", sets, reps, rest, "Não exceda a linha das orelhas."),
          getExercise("Elevação Lateral", sets, reps, rest, "Cotovelos flexionados."),
          getExercise("Elevação Frontal", 3, reps, rest, "Alternado ou simultâneo."),
          getExercise("Abdominal Crunch", 3, "15-20", "30s", "Contraia o abdômen."),
          getExercise("Prancha", 3, "30-60s", "30s", "Corpo em linha reta."),
        ],
      },
    ],
    5: [
      {
        day: "Segunda", muscleGroup: "Peito",
        exercises: [
          getExercise("Supino Reto", sets, reps, rest, "Escápulas retraídas."),
          getExercise("Supino Inclinado", sets, reps, rest, "30-45 graus."),
          getExercise("Crucifixo", 3, reps, rest, "Controle a amplitude."),
        ],
      },
      {
        day: "Terça", muscleGroup: "Costas",
        exercises: [
          getExercise("Puxada Frontal", sets, reps, rest, "Puxe ao peito."),
          getExercise("Remada Curvada", sets, reps, rest, "Costas neutras."),
          getExercise("Remada Baixa", sets, reps, rest, "Tronco ereto."),
        ],
      },
      {
        day: "Quarta", muscleGroup: "Pernas",
        exercises: [
          getExercise("Agachamento Livre", sets, reps, rest, "Profundidade de 90°."),
          getExercise("Leg Press", sets, reps, rest, "Sem travar joelhos."),
          getExercise("Cadeira Extensora", 3, reps, rest, "Contração no topo."),
          getExercise("Mesa Flexora", 3, reps, rest, "Negativo controlado."),
          getExercise("Panturrilha", 4, "15-20", rest, "Full ROM."),
        ],
      },
      {
        day: "Quinta", muscleGroup: "Ombros",
        exercises: [
          getExercise("Desenvolvimento", sets, reps, rest, "Postura reta."),
          getExercise("Elevação Lateral", sets, reps, rest, "Leve flexão nos cotovelos."),
          getExercise("Elevação Frontal", 3, reps, rest, "Alterne os braços."),
        ],
      },
      {
        day: "Sexta", muscleGroup: "Braços + Abdômen",
        exercises: [
          getExercise("Rosca Direta", sets, reps, rest, "Sem impulso."),
          getExercise("Rosca Alternada", 3, reps, rest, "Supinação."),
          getExercise("Tríceps Pulley", sets, reps, rest, "Cotovelos fixos."),
          getExercise("Tríceps Testa", 3, reps, rest, "Controle a descida."),
          getExercise("Abdominal Crunch", 3, "15-20", "30s", "Contraia no topo."),
          getExercise("Prancha", 3, "45-60s", "30s", "Corpo alinhado."),
        ],
      },
    ],
  };

  const freq = Math.min(Math.max(profile.frequency, 3), 5) as 3 | 4 | 5;
  const workout = workoutTemplates[freq];

  const baseCalories = isLoss
    ? profile.weight * 25
    : isHypertrophy
    ? profile.weight * 35
    : profile.weight * 30;

  const diet: Meal[] = [
    {
      name: "Café da Manhã",
      time: "07:00",
      foods: [
        { item: "Ovos mexidos", quantity: "3 unidades", calories: 210 },
        { item: "Pão integral", quantity: "2 fatias", calories: 140 },
        { item: "Banana", quantity: "1 unidade", calories: 90 },
      ],
      totalCalories: 440,
      macros: { protein: 25, carbs: 50, fat: 15 },
    },
    {
      name: "Almoço",
      time: "12:00",
      foods: [
        { item: "Frango grelhado", quantity: "200g", calories: 330 },
        { item: "Arroz integral", quantity: "150g", calories: 180 },
        { item: "Brócolis", quantity: "100g", calories: 35 },
        { item: "Azeite de oliva", quantity: "1 colher", calories: 90 },
      ],
      totalCalories: 635,
      macros: { protein: 45, carbs: 55, fat: 18 },
    },
    {
      name: "Lanche da Tarde",
      time: "16:00",
      foods: [
        { item: "Whey protein", quantity: "1 scoop", calories: 120 },
        { item: "Aveia", quantity: "40g", calories: 150 },
        { item: "Morango", quantity: "100g", calories: 32 },
      ],
      totalCalories: 302,
      macros: { protein: 30, carbs: 35, fat: 5 },
    },
    {
      name: "Jantar",
      time: "20:00",
      foods: [
        { item: "Peixe grelhado", quantity: "200g", calories: 250 },
        { item: "Batata doce", quantity: "150g", calories: 130 },
        { item: "Salada verde", quantity: "à vontade", calories: 25 },
      ],
      totalCalories: 405,
      macros: { protein: 40, carbs: 35, fat: 8 },
    },
  ];

  return {
    workout,
    diet,
    totalDailyCalories: Math.round(baseCalories),
  };
}
