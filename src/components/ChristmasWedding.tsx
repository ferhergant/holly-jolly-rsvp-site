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
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Por favor ingresa la URL de tu webhook de Pipedream",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Enviando datos a Pipedream:", webhookUrl);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          event: "Christmas Wedding RSVP",
          couple: "Rocío & Jorge",
          date: "23 de Diciembre, 2024"
        }),
      });

      toast({
        title: "¡Confirmación enviada!",
        description: "Gracias por confirmar tu asistencia. Los datos han sido enviados a Pipedream.",
      });
      
      // Reset form
      setFormData({
        name: '',
        companion: '',
        transport: '',
        allergies: '',
        attending: ''
      });
    } catch (error) {
      console.error("Error enviando a Pipedream:", error);
      toast({
        title: "Error",
        description: "No se pudo enviar la confirmación. Verifica la URL del webhook.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
              En esta época de amor y celebración, queremos compartir con vosotros 
              el momento más especial de nuestras vidas. Uníos a nosotros en una 
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
            <h2 className="text-3xl font-serif text-center text-christmas-forest mb-12">
              Cronograma Navideño
            </h2>
            
            <div className="relative max-w-md mx-auto">
              {/* Vertical line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-christmas-burgundy transform -translate-x-1/2"></div>
              
              {timelineEvents.map((event, index) => {
                const IconComponent = event.icon;
                return (
                  <div key={index} className="relative mb-12 last:mb-0">
                    {/* Red dot on the line */}
                    <div className="absolute left-1/2 top-6 w-3 h-3 bg-christmas-burgundy rounded-full transform -translate-x-1/2 z-10"></div>
                    
                    {/* Content alternating sides */}
                    <div className={`flex items-start ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                      {/* Icon and time side */}
                      <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                        <div className="mb-2">
                          <IconComponent className="w-8 h-8 text-christmas-forest mx-auto" style={{
                            filter: 'drop-shadow(1px 1px 0px rgba(0,0,0,0.1))',
                            transform: 'rotate(-5deg)'
                          }} />
                        </div>
                        <div className="text-2xl font-bold text-christmas-forest mb-1">{event.time}</div>
                      </div>
                      
                      {/* Event details side */}
                      <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8 text-left' : 'pr-8 text-right'}`}>
                        <h3 className="text-xl font-serif text-christmas-forest mb-2" style={{
                          transform: 'rotate(1deg)',
                          transformOrigin: 'center'
                        }}>
                          {event.event}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed" style={{
                          transform: 'rotate(-0.5deg)'
                        }}>
                          {event.description}
                        </p>
                      </div>
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
                <Label htmlFor="webhookUrl" className="text-christmas-forest font-medium">
                  URL de Webhook de Pipedream
                </Label>
                <Input
                  id="webhookUrl"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="mt-1 border-christmas-gold/50 focus:border-christmas-forest"
                  placeholder="https://your-pipedream-endpoint.m.pipedream.net"
                  type="url"
                />
              </div>

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
                disabled={isLoading}
                className="w-full bg-christmas-forest hover:bg-christmas-pine text-christmas-champagne text-lg py-3 disabled:opacity-50"
              >
                {isLoading ? 'Enviando...' : 'Confirmar Asistencia 🎄'}
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
