import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { Heart, TreePine, Snowflake, Bell, Calendar, MapPin, Clock, Star } from 'lucide-react';
import titleImage from '../assets/title.png';
// using uploaded illustration path

const ChristmasWedding = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    companion: '',
    transport: '',
    allergies: '',
    attending: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu nombre",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Using Pipedream endpoint
      const response = await fetch('https://eolpxah866aycv0.m.pipedream.net', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          companion: formData.companion,
          transport: formData.transport,
          allergies: formData.allergies,
          attending: formData.attending,
          subject: `RSVP de ${formData.name} - Boda Rocío & Jorge`,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast({
          title: "¡Confirmación enviada!",
          description: "Gracias por confirmar tu asistencia a nuestra boda navideña.",
        });
        
        // Reset form
        setFormData({
          name: '',
          companion: '',
          transport: '',
          allergies: '',
          attending: ''
        });
      } else {
        throw new Error('Error al enviar confirmación');
      }
    } catch (error) {
      console.error("Error enviando confirmación:", error);
      toast({
        title: "Error",
        description: "No se pudo enviar la confirmación. Por favor intenta de nuevo.",
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
      image: "/lovable-uploads/0f9d8a23-0e35-4cb1-9018-9103e40e769d.png",
      description: "Iglesia San Nicolás"
    },
    {
      time: "18:00h", 
      event: "Cóctel Navideño",
      image: "/lovable-uploads/295a24de-dc84-42b8-8853-477084fb8438.png",
      description: "Jardines del Palacio"
    },
    {
      time: "20:30h",
      event: "Cena",
      image: "/lovable-uploads/7f1282cc-1be3-40a4-bb20-2e04798854fc.png",
      description: "Salón Principal"
    },
    {
      time: "23:00h",
      event: "Fiesta de Nochebuena",
      image: "/lovable-uploads/0f9d8a23-0e35-4cb1-9018-9103e40e769d.png",
      description: "¡Hasta el amanecer!"
    }
  ];

  const faqData = [
    {
      question: "Alojamientos",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      question: "Restaurantes",
      answer: "¡Por supuesto! Los niños son bienvenidos en nuestra celebración navideña. Habrá actividades especiales y un menú infantil disponible."
    },
    {
      question: "Peluquería y maquillaje",
      answer: "Ofrecemos transporte gratuito desde el centro de la ciudad hasta el venue. Los buses saldrán cada 30 minutos a partir de las 15:30h desde la Plaza Mayor."
    },
    {
      question: "Transporte",
      answer: "¡Será aún más mágico! Nuestro venue cuenta con espacios interiores completamente equipados y calefaccionados para disfrutar sin preocupaciones."
    },
    {
      question: "Regalo de boda",
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

        <div className="relative z-10 container mx-auto px-4 py-12 bg-[#82050b]/5 rounded-lg p-8 font-['Helvetica']">
        {/* Hero Section */}
        <Card className="mb-12 bg-card/80 backdrop-blur-sm border-christmas-gold/30">
          <CardContent className="p-12 text-center">

          <div className="mt-8">
              <img 
                src={titleImage} 
                alt="Titulo"
                className="w-full max-w-2xl mx-auto opacity-90"
                loading="lazy"
              />
          </div>

          <div className="mt-8">
              <img 
                src="/lovable-uploads/295a24de-dc84-42b8-8853-477084fb8438.png" 
                alt="Lazo rojo nupcial"
                className="w-32 h-auto mx-auto opacity-90"
                loading="lazy"
              />
          </div>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              ¡Nos casamos! Y estamos deseando celebrar junto a vosotros nuestra boda. Mientras llega el gran día hemos creado
              esta web para que estéis al día de todo lo que va a ocurrir.
            </p>
          </CardContent>
        </Card>

        {/* Celebration Card */}
        <div className="mb-12">
          <Card className="bg-[#82050b] border-accent/30">
            <CardContent className="p-10 text-center">
              <Heart className="w-8 h-8 mx-auto mb-4 text-white" />
              <h3 className="text-2xl font-serif mb-2 text-white">CELEBRACIÓN</h3>
              <h4 className="text-xl mb-4 text-white">Bodega Vinas de El Regajal - Aranjuez</h4>
              <a href="https://maps.app.goo.gl/NLUJexwxn4bhe7EY6" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-primary-foreground"
                >
                  ¿CÓMO LLEGAR?
                </Button>
              </a>
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
                return (
                  <div key={index} className="relative mb-12 last:mb-0">
                    {/* Red dot on the line */}
                    <div className="absolute left-1/2 top-6 w-3 h-3 bg-christmas-burgundy rounded-full transform -translate-x-1/2 z-10"></div>
                    
                    {/* Content alternating sides */}
                    <div className={`flex items-start ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                      {/* Image and time side */}
                      <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                        <div className="mb-2">
                          <img 
                            src={event.image} 
                            alt={`${event.event} icon`}
                            className="w-30 h-30 mx-auto object-contain" 
                            style={{
                              filter: 'drop-shadow(1px 1px 0px rgba(0,0,0,0.1))',
                              transform: 'rotate(-5deg)'
                            }} 
                          />
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
                Recomendaciones
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
