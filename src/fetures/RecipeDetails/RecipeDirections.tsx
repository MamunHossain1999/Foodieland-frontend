
const RecipeDirections = () => {
  const steps = [
    {
      title: "Lorem ipsum dolor sit amet",
      description:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
      image:
        "https://i.ibb.co.com/whHdJCxR/a18924703d3ad37c1b04115b9d86b67b82023a90-1.png"
    },
    {
      title: "Lorem ipsum dolor sit amet",
      description:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    },
    {
      title: "Lorem ipsum dolor sit amet",
      description:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    },
  ];

  return (
    <div className=" py-8">
      <h2 className="text-2xl font-bold mb-6">Directions</h2>
      <div className="space-y-10">
        {steps.map((step, index) => (
          <div key={index} className="space-y-4">
            {/* Step with Radio Button */}
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="recipe-step"
                className="mt-1 w-5 h-5 border-gray-400 text-blue-500 focus:ring-0"
              />
              <div>
                <h3 className="font-semibold">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>

            {/* Step Image */}
            {step.image && (
              <img
                src={step.image}
                alt={step.title}
                className="rounded-lg w-full h-[400px] "
              />
            )}

            {/* Repeat Description if image exists */}
            {step.image && (
              <p className="text-gray-600">{step.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeDirections;
