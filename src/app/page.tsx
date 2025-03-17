"use client"

import { useState, useEffect } from "react"
import { Minus, Plus, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getContador, incrementar, decrementar, resetear } from "./api/actions";

export default function Contador() {
  const [contador, setContador] = useState<number | null>(null);

  useEffect(() => {
    getContador().then(setContador);
  }, []);

  const handleIncrementar = async () => {
    await incrementar();
    setContador((prev) => (prev !== null ? prev + 1 : 0));
  };

  const handleDecrementar = async () => {
    await decrementar();
    setContador((prev) => (prev !== null ? prev - 1 : 0));
  };

  const handleResetear = async () => {
    await resetear();
    setContador(0);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4 dark:from-slate-900 dark:to-slate-800">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Contador interactivo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex items-center justify-center">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 shadow-inner">
              <span className="text-5xl font-bold text-primary">{contador}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={handleDecrementar}
              className="flex h-16 items-center justify-center text-lg transition-all hover:scale-105 hover:bg-destructive hover:text-destructive-foreground"
            >
              <Minus className="mr-2 h-5 w-5" />
              Disminuir
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleResetear}
              className="flex h-16 items-center justify-center text-lg transition-all hover:scale-105"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Resetear
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleIncrementar}
              className="flex h-16 items-center justify-center text-lg transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground"
            >
              <Plus className="mr-2 h-5 w-5" />
              Aumentar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}