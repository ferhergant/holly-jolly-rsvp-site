import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { Heart, Snowflake } from 'lucide-react';
import titleImage from '../assets/title.png';
import coverImage from '../assets/cover.png';
import bimbaFarewell from '../assets/bimba-os-esperamos.png';
import timelineImage from '../assets/timeline.png';
import originBusImage from '../assets/origin_bus.png';
import destinationTreeImage from '../assets/destination_tree.png';
import { attendees } from '../data/attendees';
// using uploaded illustration path

const ChristmasWedding = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    transport: '',
    allergies: '',
    childrenCount: '',
    childChairs: '',
    childMenu: '',
    normalChairs: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Search functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAttendees, setFilteredAttendees] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter attendees based on search term (case insensitive)
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.trim() === '') {
      setFilteredAttendees([]);
      setShowDropdown(false);
    } else {
      const filtered = attendees.filter(name =>
        name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredAttendees(filtered);
      setShowDropdown(filtered.length > 0);
    }
  };

  // Select an attendee from the dropdown
  const selectAttendee = (name: string) => {
    setFormData(prev => ({ ...prev, name }));
    setSearchTerm(name);
    setFilteredAttendees([]);
    setShowDropdown(false);
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'name') {
      handleSearch(value);
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
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
      const response = await fetch('https://webhook.latenode.com/77030/prod/21ceeda7-e1b1-4e7c-b946-1213d8a56748', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          transport: formData.transport,
          allergies: formData.allergies,
          childrenCount: formData.childrenCount,
          childChairs: formData.childChairs,
          normalChairs: formData.normalChairs,
          childMenu: formData.childMenu,
          subject: `RSVP de ${formData.name} - Boda Rocío & Jorge`,
          timestamp: new Date().toLocaleString('es-ES', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          }).replace(',', ''),
        }),
      });

      if (response.ok) {
        toast({
          title: "¡Confirmación enviada! 💒",
          description: "Gracias por confirmar tu asistencia a nuestra boda navideña.",
          className: "bg-[#82050b]/90 text-white border-[#82050b]/50",
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          transport: '',
          allergies: '',
          childrenCount: '',
          childChairs: '',
          childMenu: '',
          normalChairs: ''
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
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          );
        case 'website':
          return (
            <a href={linkUrl} target="_blank" rel="noopener noreferrer" className={linkClasses}>
              <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </a>
          );
        case 'facebook':
          return (
            <a href={linkUrl} target="_blank" rel="noopener noreferrer" className={linkClasses}>
              <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
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
        <span className="text-muted-foreground">. {description} <b>{priceRange}</b></span>
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
            <li><a href="https://www.booking.com/Share-dZ96NhA" target="_blank" rel="noopener noreferrer" className="text-christmas-forest hover:text-christmas-burgundy underline">NH Collection Palacio de Aranjuez</a><a>*</a></li>
            <li><a href="https://www.booking.com/Share-599LpH" target="_blank" rel="noopener noreferrer" className="text-christmas-forest hover:text-christmas-burgundy underline">Hotel Equo Aranjuez</a></li>
            <li><a href="https://www.booking.com/Share-EuBSI2" target="_blank" rel="noopener noreferrer" className="text-christmas-forest hover:text-christmas-burgundy underline">Royal Retreat Aranjuez</a></li>
          </ul>
          <p className="text-sm text-muted-foreground italic text-left">
            * El <b>Hotel NH Collection Palacio de Aranjuez</b> solo se permite reservar 2 noches por Booking. Si queréis reservar solo una noche, contactar con nosotros.
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
            "Comida tradicional española cercano al Hotel Equo",
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
          <li><a href="https://maps.app.goo.gl/ccR2NYq32gQQmyP1A" target="_blank" rel="noopener noreferrer" className="text-christmas-forest hover:text-christmas-burgundy underline">Centro de Estetica Almibar en Aranjuez</a>
            <a>. Estética y maquillaje profesional. Confirmad apertura y horarios.</a></li>
          <li><a href="https://maps.app.goo.gl/inrou13XepBKqnAi6" target="_blank" rel="noopener noreferrer" className="text-christmas-forest hover:text-christmas-burgundy underline">RC Peluqueros y Estilistas</a>
            <a>. Peluquería y estilismo profesional. Confirmad apertura y horarios.</a></li>
          <li><a href="https://maps.app.goo.gl/LJWRD86ETGc3Gisd8" target="_blank" rel="noopener noreferrer" className="text-christmas-forest hover:text-christmas-burgundy underline">Chic’s Peluqueros</a>
            <a>. Peluquería. Confirmad apertura y horarios.</a></li>
        </ul>
      )
    },
    {
      question: "Transporte",
      answer: (
        <p className="text-left">
          🚌 Hay un autobús disponible desde dos paradas en Aranjuez —una en el Hotel NH Collection Palacio y otra en el Hotel
          Equo— hasta la finca El Regajal. <b>Es necesario confirmarlo previamente mediante el formulario final.</b>
        </p>
      )
    },
    {
      question: "Regalo de boda",
      answer: (
        <div>
          <p className="text-left">✨ Si queréis tener un detalle con nosotros, os dejamos nuestro número de cuenta.</p>
          <div className="relative bg-white rounded-lg">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <code className="text-gray-800 font-mono text-xs break-words">
                  ES13 2085 9723 1403 3050 6955
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText('ES13 2085 9723 1403 3050 6955');
                    toast({
                      title: "¡Copiado! 🎉",
                      description: "Número de cuenta copiado al portapapeles",
                      className: "bg-[#82050b]/90 text-white border-[#82050b]/50",
                    });
                  }}
                  className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 h-8 px-2 flex-shrink-0"
                >
                  📋 Copiar
                </Button>
              </div>
            </div>
          </div>
        </div>
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

            <div className="mt-8 mb-12">
              <img
                src={coverImage}
                alt="Cover"
                className="w-full h-auto max-w-6xl mx-auto opacity-90"
                loading="lazy"
              />
            </div>

            <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              ¡Nos casamos! Y estamos deseando celebrar junto a vosotros nuestra boda. Mientras llega el gran día hemos creado
              esta web para que estéis al tanto de todo lo que va a ocurrir.
            </p>
          </CardContent>
        </Card>

        {/* Venue Journey Card */}
        <div className="mb-12">
          <Card className="bg-gradient-to-br from-red-900 via-red-800 to-red-900 border-red-700/50">
            <CardContent className="p-8">
              <h2 className="text-3xl font-serif text-center text-white mb-12">
                Ubicaciones
              </h2>

              {/* Journey Visualization */}
              <div className="max-w-6xl mx-auto">

                {/* Two Images Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Left Image - Origin */}
                  <div className="flex flex-col items-center h-full">
                    <img
                      src={originBusImage}
                      alt="Origin - Bus stops"
                      className="w-full h-auto max-h-64 object-contain rounded-lg opacity-90"
                      loading="lazy"
                    />
                    <div className="mt-4 text-center flex-1 flex flex-col justify-center">
                      <h4 className="text-white font-semibold text-lg mb-4">Puntos de parada de autobús*</h4>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <div className="text-center">
                          <h5 className="text-white font-medium mb-3">Hotel NH Collection</h5>
                          <a href="https://maps.app.goo.gl/cR1RpVGzxFvWBRVt6" target="_blank" rel="noopener noreferrer">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-white text-white hover:bg-white hover:text-red-900 transition-colors bg-white/10"
                            >
                              📍 Ver en Maps
                            </Button>
                          </a>
                        </div>
                        <div className="text-center">
                          <h5 className="text-white font-medium mb-3">Hotel Equo</h5>
                          <a href="https://maps.app.goo.gl/2WrX8GyhxVysUqWE9" target="_blank" rel="noopener noreferrer">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-white text-white hover:bg-white hover:text-red-900 transition-colors bg-white/10"
                            >
                              📍 Ver en Maps
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Image - Destination */}
                  <div className="flex flex-col items-center h-full">
                    <img
                      src={destinationTreeImage}
                      alt="Destination - Venue"
                      className="w-full h-auto max-h-64 object-contain rounded-lg opacity-90"
                      loading="lazy"
                    />
                    <div className="mt-4 text-center flex-1 flex flex-col justify-center">
                      <h4 className="text-white font-semibold text-lg mb-4">Lugar de la Celebración</h4>
                      <h5 className="text-white font-medium mb-3">Finca El Regajal</h5>
                      <a href="https://maps.app.goo.gl/NLUJexwxn4bhe7EY6" target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white text-white hover:bg-white hover:text-red-900 transition-colors bg-white/10"
                        >
                          📍 Ver en Maps
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Journey info */}
                <div className="mt-8 text-center">
                  <p className="text-white/70 text-sm">
                    ⏱️ Duración aproximada del viaje: 10 minutos
                  </p>
                  <p className="text-white/70 text-xs mt-2">
                    *Es necesario confirmar el transporte mediante el formulario
                  </p>
                </div>
              </div>
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
              <h2 className="text-3xl font-serif text-center text-christmas-forest">
                Recomendaciones
              </h2>
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
              <h2 className="text-3xl font-serif text-center text-christmas-forest">
                Confirma tu Asistencia
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
              <div className="relative">

                <Label htmlFor="name" className="text-christmas-forest font-medium">
                  Email de confirmación
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="text-christmas-forest font-medium border-christmas-gold/50 focus:border-christmas-forest"
                  placeholder="tu@email.com"
                  required
                />

                <Label htmlFor="name" className="text-christmas-forest font-medium">
                  Nombre y Apellidos
                </Label>
                <Input
                  id="name"
                  value={searchTerm}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="text-christmas-forest font-medium border-christmas-gold/50 focus:border-christmas-forest"
                  placeholder="Busca tu nombre..."
                  required
                />

                {/* Dropdown with filtered attendees */}
                {showDropdown && filteredAttendees.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-christmas-gold/30 rounded-md shadow-lg max-h-48 overflow-auto">
                    {filteredAttendees.map((name, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-christmas-gold/10 cursor-pointer border-b border-christmas-gold/20 last:border-b-0"
                        onClick={() => selectAttendee(name)}
                      >
                        <span className="text-christmas-forest font-medium">{name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Label className="text-christmas-forest font-medium">
                  ¿Necesitas transporte desde Aranjuez a la finca?
                </Label>
                <div className="mt-2 space-y-2">
                  {['Sí, necesito transporte desde el Hotel NH Collection', 'Sí, necesito transporte desde el Hotel Equo', 'No, iré por mi cuenta'].map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="transport"
                        value={option}
                        checked={formData.transport === option}
                        onChange={(e) => handleInputChange('transport', e.target.value)}
                        className="text-christmas-forest focus:ring-christmas-forest"
                        required
                      />
                      <span className="text-sm text-christmas-forest">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Allergies Subsection */}
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

              {/* Children Subsection */}
              <div className="border-t border-christmas-gold/30 mt-2">
                <h3 className="text-lg font-semibold text-christmas-forest mb-4">
                  👶 Información sobre Niños
                </h3>

                <p className="text-sm text-muted-foreground italic text-left pb-6">
                  Por favor, solo rellenar esta sección por uno de los padres.
                </p>

                <div className="space-y-4">
                  {/* Number of Children */}
                  <div>
                    <Label htmlFor="childrenCount" className="text-christmas-forest font-medium">
                      ¿Cuántos niños asistirán?
                    </Label>
                    <select
                      id="childrenCount"
                      value={formData.childrenCount}
                      onChange={(e) => handleInputChange('childrenCount', e.target.value)}
                      className="mt-1 w-full border border-christmas-gold/50 focus:border-christmas-forest rounded-md px-3 py-2 bg-white text-christmas-forest font-medium"
                    >
                      <option value="" className="text-christmas-forest font-medium">Selecciona el número</option>
                      <option value="0" className="text-christmas-forest font-medium">0 - No hay niños</option>
                      <option value="1" className="text-christmas-forest font-medium">1 niño</option>
                      <option value="2" className="text-christmas-forest font-medium">2 niños</option>
                      <option value="3" className="text-christmas-forest font-medium">3 niños</option>
                      <option value="4" className="text-christmas-forest font-medium">4 niños</option>
                      <option value="5+" className="text-christmas-forest font-medium">5 o más niños</option>
                    </select>
                  </div>

                  {/* Child Chairs */}
                  {formData.childrenCount && formData.childrenCount !== '0' && (
                    <div>
                      <Label htmlFor="childChairs" className="text-christmas-forest font-medium">
                        ¿Cuántas tronas de niño necesitas?
                      </Label>
                      <select
                        id="childChairs"
                        value={formData.childChairs}
                        onChange={(e) => handleInputChange('childChairs', e.target.value)}
                        className="mt-1 w-full border border-christmas-gold/50 focus:border-christmas-forest rounded-md px-3 py-2 bg-white text-christmas-forest font-medium"
                      >
                        <option value="" className="text-christmas-forest font-medium">Selecciona el número</option>
                        {[...Array(parseInt(formData.childrenCount) + 1)].map((_, i) => (
                          <option key={i} value={i} className="text-christmas-forest font-medium">{i} trona{i !== 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Child Chairs */}
                  {formData.childrenCount && formData.childrenCount !== '0' && (
                    <div>
                      <Label htmlFor="normalChairs" className="text-christmas-forest font-medium">
                        ¿Cuántas sillas normales necesitas?
                      </Label>
                      <select
                        id="normalChairs"
                        value={formData.normalChairs}
                        onChange={(e) => handleInputChange('normalChairs', e.target.value)}
                        className="mt-1 w-full border border-christmas-gold/50 focus:border-christmas-forest rounded-md px-3 py-2 bg-white text-christmas-forest font-medium"
                      >
                        <option value="" className="text-christmas-forest font-medium">Selecciona el número</option>
                        {[...Array(parseInt(formData.childrenCount) + 1)].map((_, i) => (
                          <option key={i} value={i} className="text-christmas-forest font-medium">{i} silla{i !== 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Child Chairs */}
                  {formData.childrenCount && formData.childrenCount !== '0' && (
                    <div>
                      <Label htmlFor="childChairs" className="text-christmas-forest font-medium">
                        ¿Cuántos menús infantiles necesitas?
                      </Label>
                      <select
                        id="childMenu"
                        value={formData.childMenu}
                        onChange={(e) => handleInputChange('childMenu', e.target.value)}
                        className="mt-1 w-full border border-christmas-gold/50 focus:border-christmas-forest rounded-md px-3 py-2 bg-white text-christmas-forest font-medium"
                      >
                        <option value="" className="text-christmas-forest font-medium">Selecciona el número</option>
                        {[...Array(parseInt(formData.childrenCount) + 1)].map((_, i) => (
                          <option key={i} value={i} className="text-christmas-forest font-medium">{i} menú{i !== 1 ? 's' : ''} infantil{i !== 1 ? 'es' : ''}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-sm text-muted-foreground bg-christmas-champagne/20 p-3 rounded-lg border border-christmas-gold/30">
                <p className="text-center">
                  📧 <strong>Nota importante:</strong> Después de enviar tu confirmación, deberías recibir un email de confirmación. 
                  Si no lo recibes en unos minutos, por favor inténtalo de nuevo o contáctanos directamente.
                </p>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-christmas-forest hover:bg-christmas-pine text-christmas-champagne text-lg py-3 disabled:opacity-50"
              >
                {isLoading ? 'Enviando...' : 'Confirmar o Actualizar Asistencia 🎄'}
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
                ¡Estamos deseando que nos acompañeis en este día tan especial!
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
