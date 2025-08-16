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
import bimbaFarewell from '../assets/bimba-os-esperamos.png';
import timelineImage from '../assets/timeline.png';
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

  // Helper function to create restaurant entries
  const createRestaurantEntry = (name: string, mapsUrl: string, description: string, priceRange: string, linkType?: 'instagram' | 'website' | 'facebook' | 'info', linkUrl?: string) => {
    const renderLink = () => {
      if (!linkType || !linkUrl) return null;
      
      const linkClasses = "ml-2 text-christmas-burgundy hover:text-christmas-forest underline";
      
      switch (linkType) {
        case 'instagram':
          return (
            <a href={linkUrl} target="_blank" rel="noopener noreferrer" className={linkClasses}>
              <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          );
        case 'website':
          return (
            <a href={linkUrl} target="_blank" rel="noopener noreferrer" className={linkClasses}>
              <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </a>
          );
        case 'facebook':
          return (
            <a href={linkUrl} target="_blank" rel="noopener noreferrer" className={linkClasses}>
              <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          );
        case 'info':
          return (
            <a href={linkUrl} target="_blank" rel="noopener noreferrer" className={linkClasses}>
              Más info
            </a>
          );
        default:
          return null;
      }
    };

    return (
      <li>
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="text-christmas-forest hover:text-christmas-burgundy underline">
          {name}
        </a>
        <span className="text-muted-foreground">. {description} {priceRange}</span>
        {renderLink()}
      </li>
    );
  };

  const faqData = [
    {
      question: "Alojamientos",
              answer: (
          <div>
            <ul className="list-disc list-inside space-y-2 text-left mb-4">
              <li><a href="https://www.booking.com/Share-dZ96NhA" target="_blank" rel="noopener noreferrer" className="text-christmas-forest hover:text-christmas-burgundy underline">NH Collection Palacio de Aranjuez</a><a>***</a></li>
              <li><a href="https://www.booking.com/Share-599LpH" target="_blank" rel="noopener noreferrer" className="text-christmas-forest hover:text-christmas-burgundy underline">Hotel Equo Aranjuez</a></li>
              <li><a href="https://www.booking.com/Share-EuBSI2" target="_blank" rel="noopener noreferrer" className="text-christmas-forest hover:text-christmas-burgundy underline">Royal Retreat Aranjuez</a></li>
            </ul>
            <p className="text-sm text-muted-foreground italic text-left">
              *** El Hotel NH Collection Palacio de Aranjuez solo se puede reservar 2 noches por Booking. Si queréis reservar solo una noche, contactar con nosotros
            </p>
          </div>
        )
    },
    {
      question: "Restaurantes",
      answer: (
        <ul className="list-disc list-inside space-y-2 text-left">
          {createRestaurantEntry(
            "Restaurante Casa José",
            "https://maps.app.goo.gl/zTjoqnKPyz3Nvbku9",
            "Comida tradicional española cercano al Hotel NH Collection",
            "€€€€",
            "info",
            "https://casajose.es/"
          )}
          {createRestaurantEntry(
            "Restaurante Almíbar",
            "https://maps.app.goo.gl/Smed8a3KxxzGRRfY6",
            "Comida tradicional española cercana al Hotel Equo",
            "€€€",
            "info",
            "https://www.instagram.com/restaurantealmibar?igsh=YnE3Y25iNG5nbmlj"
          )}
          {createRestaurantEntry(
            "La Taberna del Tomate | Bar de Tapas en Aranjuez",
            "https://maps.app.goo.gl/hmnmGwdoBMhDAXQ4A",
            "Comida tradicional española de tapeo",
            "€€",
            "info",
            "https://www.eltomatedearanjuez.es/en/la-taberna-del-tomate/"
          )}
          {createRestaurantEntry(
            "Restaurante Postas Taperia",
            "https://maps.app.goo.gl/zgu7CW6PRTE7abuDA",
            "Comida tradicional española de tapeo",
            "€€",
            "info",
            "https://postastaperia.es/carta/"
          )}
        </ul>
      )
    },
    {
      question: "Peluquería y maquillaje",
      answer: (
        <ul className="list-disc list-inside space-y-2 text-left">
          <li>Salón de Belleza Aranjuez - Centro de la ciudad</li>
          <li>Estética María José - Especializada en bodas</li>
          <li>Peluquería Unisex Estilo - Servicio a domicilio</li>
          <li>Centro de Belleza Glamour - Maquillaje profesional</li>
          <li>Salón Elegance - Tratamientos completos</li>
        </ul>
      )
    },
    {
      question: "Transporte",
      answer: (
        <ul className="list-disc list-inside space-y-2 text-left">
          <li>Autobús gratuito desde Plaza Mayor - Cada 30 min</li>
          <li>Taxi desde estación de tren - 10 min al venue</li>
          <li>Parking gratuito en el venue</li>
          <li>Servicio de lanzadera desde hoteles</li>
          <li>Uber y Cabify disponibles en la zona</li>
        </ul>
      )
    },
    {
      question: "Regalo de boda",
      answer: (
        <ul className="list-disc list-inside space-y-2 text-left">
          <li>Tu presencia es nuestro mejor regalo</li>
          <li>Si deseas hacer un regalo, preferimos sobres</li>
          <li>También aceptamos regalos de la lista de bodas</li>
          <li>Información de cuenta bancaria disponible</li>
          <li>Regalos físicos se pueden entregar el día de la boda</li>
        </ul>
      )
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
                className="w-full max-w-4xl mx-auto opacity-90"
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
              Timeline
            </h2>

            <img 
               src={timelineImage} 
               alt="Timeline"
               className="w-full max-w-md mx-auto opacity-90"
               loading="lazy"
             />
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
        <Card className="mb-12 bg-gradient-to-br from-christmas-champagne to-background border-christmas-gold/50">
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
                  className="mt-1 border-2 border-christmas-gold focus:border-christmas-forest resize-none rounded-md"
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
          </CardContent>
        </Card>


        {/* Bimba Farewell Card */}
        <Card className="mb-2 bg-gradient-to-br from-christmas-champagne to-background border-christmas-gold/50">
          <CardContent className="p-8 text-center">
            <img 
              src={bimbaFarewell} 
              alt="Bimba os esperamos"
              className="w-full max-w-2xl mx-auto opacity-90"
              loading="lazy"
            />

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                ¡Estamos deseando que nos acompañes en este día tan especial!
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
