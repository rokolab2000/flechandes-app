
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Carolina Mendoza",
      role: "Cliente",
      content: "Excelente servicio. Los transportistas llegaron puntualmente y trataron mis pertenencias con mucho cuidado. Definitivamente los recomendaría.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 2,
      name: "Rodrigo Fuentes",
      role: "Cliente",
      content: "La aplicación es muy intuitiva y pude coordinar mi mudanza en minutos. El transportista fue muy profesional y el precio justo.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 3,
      name: "Alejandra Torres",
      role: "Cliente",
      content: "La mejor experiencia de mudanza que he tenido. Todo fue rápido, seguro y el seguimiento en tiempo real me dio mucha tranquilidad.",
      rating: 4,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star 
          key={i}
          size={16} 
          className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
        />
      ));
  };

  return (
    <section className="py-16 px-4 bg-[#f5f5f5]" id="testimonios">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Miles de personas confían en nosotros para sus necesidades de transporte y mudanza
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {renderStars(testimonial.rating)}
                </div>
                <span className="text-sm text-gray-600">{testimonial.rating}.0</span>
              </div>
              
              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
