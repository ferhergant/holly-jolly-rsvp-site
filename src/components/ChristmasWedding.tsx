import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { Heart, TreePine, Snowflake, Bell, Calendar, MapPin, Clock, Star } from 'lucide-react';
import christmasIllustrations from '@/assets/christmas-wedding-illustrations.png';

const ChristmasWedding = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    companion: '',
    transport: '',
    allergies: '',
    attending: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "¡Confirmación recibida!",
      description: "Gracias por confirmar tu asistencia a nuestra boda navideña.",
    });
  };

  const timelineEvents = [
    {
      time: "16:30h",
      event: "Ceremonia",
      icon: Bell,
      description: "Iglesia San Nicolás"
    },
    {
      time: "18:00h", 
      event: "Cóctel Navideño",
      icon: Star,
      description: "Jardines del Palacio"
    },
    {
      time: "20:30h",
      event: "Cena",
      icon: Heart,
      description: "Salón Principal"
    },
    {
      time: "23:00h",
      event: "Fiesta de Nochebuena",
      icon: TreePine,
      description: "¡Hasta el amanecer!"
    }
  ];

  const faqData = [
    {
      question: "¿Hay código de vestimenta navideño?",
      answer: "Invitamos a nuestros invitados a incorporar toques navideños en su vestimenta: colores como verde bosque, dorado, burgundy o elementos festivos discretos. ¡Pero lo más importante es que te sientas cómodo y elegante!"
    },
    {
      question: "¿Pueden asistir niños?",
      answer: "¡Por supuesto! Los niños son bienvenidos en nuestra celebración navideña. Habrá actividades especiales y un menú infantil disponible."
    },
    {
      question: "¿Hay servicio de transporte?",
      answer: "Ofrecemos transporte gratuito desde el centro de la ciudad hasta el venue. Los buses saldrán cada 30 minutos a partir de las 15:30h desde la Plaza Mayor."
    },
    {
      question: "¿Qué pasa si nieva?",
      answer: "¡Será aún más mágico! Nuestro venue cuenta con espacios interiores completamente equipados y calefaccionados para disfrutar sin preocupaciones."
    },
    {
      question: "¿Habrá regalos de Navidad?",
      answer: "Como regalo especial, cada invitado recibirá un detalle navideño personalizado. ¡Tu presencia es nuestro mejor regalo!"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-christmas-champagne to-christmas-gold">
      {/* Decorative snowflakes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <Snowflake 
            key={i}
            className="absolute text-christmas-gold/20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 20 + 10}px`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <Card className="mb-12 bg-card/80 backdrop-blur-sm border-christmas-gold/30 shadow-[var(--shadow-warm)]">
          <CardContent className="p-12 text-center">
            <div className="flex justify-center mb-6">
              <TreePine className="w-12 h-12 text-christmas-forest" />
            </div>
            
            <h1 className="text-6xl font-serif text-christmas-forest mb-4">
              Rocío
              <span className="block text-4xl font-light my-2">&</span>
              Jorge
            </h1>
            
            <div className="flex items-center justify-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-christmas-burgundy" />
              <p className="text-xl text-christmas-forest font-medium">
                23 de Diciembre, 2024
              </p>
            </div>
            
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-christmas-gold to-transparent mx-auto mb-6"></div>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              En esta época de amor y celebración, queremos compartir con ustedes 
              el momento más especial de nuestras vidas. Únanse a nosotros en una 
              boda navideña llena de magia, amor y alegría.
            </p>
            
            <div className="mt-8">
              <img 
                src={christmasIllustrations} 
                alt="Christmas Wedding Illustrations" 
                className="w-64 h-auto mx-auto opacity-60"
              />
            </div>
          </CardContent>
        </Card>

        {/* Location Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gradient-to-br from-christmas-forest to-christmas-pine text-christmas-champagne border-christmas-gold/30">
            <CardContent className="p-8 text-center">
              <Bell className="w-8 h-8 mx-auto mb-4 text-christmas-gold" />
              <h3 className="text-2xl font-serif mb-2">CEREMONIA</h3>
              <h4 className="text-xl mb-4">Iglesia San Nicolás</h4>
              <Button variant="outline" className="border-christmas-gold text-christmas-gold hover:bg-christmas-gold hover:text-christmas-forest">
                ¿CÓMO LLEGAR?
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-christmas-burgundy to-accent text-christmas-champagne border-christmas-gold/30">
            <CardContent className="p-8 text-center">
              <Heart className="w-8 h-8 mx-auto mb-4 text-christmas-gold" />
              <h3 className="text-2xl font-serif mb-2">CELEBRACIÓN</h3>
              <h4 className="text-xl mb-4">Palacio Invernal</h4>
              <Button variant="outline" className="border-christmas-gold text-christmas-gold hover:bg-christmas-gold hover:text-christmas-burgundy">
                ¿CÓMO LLEGAR?
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <Card className="mb-12 bg-card/80 backdrop-blur-sm border-christmas-gold/30">
          <CardContent className="p-8">
            <h2 className="text-3xl font-serif text-center text-christmas-forest mb-8">
              Cronograma Navideño
            </h2>
            
            <div className="grid gap-6 max-w-2xl mx-auto">
              {timelineEvents.map((event, index) => {
                const IconComponent = event.icon;
                return (
                  <div key={index} className="flex items-center gap-6 p-4 rounded-lg bg-christmas-champagne/50">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-christmas-forest flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-christmas-gold" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-1">
                        <span className="text-2xl font-bold text-christmas-forest">{event.time}</span>
                        <span className="text-xl font-serif text-christmas-forest">{event.event}</span>
                      </div>
                      <p className="text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-12 bg-card/80 backdrop-blur-sm border-christmas-gold/30">
          <CardContent className="p-8">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Star className="w-6 h-6 text-christmas-burgundy" />
              <h2 className="text-3xl font-serif text-center text-christmas-forest">
                Preguntas Frecuentes
              </h2>
              <Star className="w-6 h-6 text-christmas-burgundy" />
            </div>
            
            <Accordion type="single" collapsible className="max-w-3xl mx-auto">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-christmas-gold/30">
                  <AccordionTrigger className="text-left text-christmas-forest hover:text-christmas-burgundy text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* RSVP Form */}
        <Card className="bg-gradient-to-br from-christmas-champagne to-background border-christmas-gold/50">
          <CardContent className="p-8">
            <div className="flex items-center justify-center gap-3 mb-8">
              <TreePine className="w-6 h-6 text-christmas-forest" />
              <h2 className="text-3xl font-serif text-center text-christmas-forest">
                Confirma tu Asistencia
              </h2>
              <TreePine className="w-6 h-6 text-christmas-forest" />
            </div>
            
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
              <div>
                <Label htmlFor="name" className="text-christmas-forest font-medium">
                  Nombre y Apellidos
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1 border-christmas-gold/50 focus:border-christmas-forest"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <Label htmlFor="companion" className="text-christmas-forest font-medium">
                  Nombre del Acompañante (opcional)
                </Label>
                <Input
                  id="companion"
                  value={formData.companion}
                  onChange={(e) => handleInputChange('companion', e.target.value)}
                  className="mt-1 border-christmas-gold/50 focus:border-christmas-forest"
                  placeholder="Nombre de tu acompañante"
                />
              </div>

              <div>
                <Label className="text-christmas-forest font-medium">
                  ¿Necesitas transporte?
                </Label>
                <div className="mt-2 space-y-2">
                  {['Sí, necesito transporte', 'No, iré por mi cuenta'].map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="transport"
                        value={option}
                        checked={formData.transport === option}
                        onChange={(e) => handleInputChange('transport', e.target.value)}
                        className="text-christmas-forest focus:ring-christmas-forest"
                      />
                      <span className="text-sm text-christmas-forest">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="allergies" className="text-christmas-forest font-medium">
                  Alergias o Restricciones Alimentarias
                </Label>
                <Textarea
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  className="mt-1 border-christmas-gold/50 focus:border-christmas-forest resize-none"
                  placeholder="Compártenos cualquier alergia o preferencia alimentaria"
                  rows={3}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-christmas-forest hover:bg-christmas-pine text-christmas-champagne text-lg py-3"
              >
                Confirmar Asistencia 🎄
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                ¡No pueden esperar a celebrar con ustedes esta Navidad tan especial!
              </p>
              <div className="flex justify-center mt-4 gap-2">
                <Heart className="w-4 h-4 text-christmas-burgundy" />
                <span className="text-christmas-forest font-serif">Rocío & Jorge</span>
                <Heart className="w-4 h-4 text-christmas-burgundy" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChristmasWedding;