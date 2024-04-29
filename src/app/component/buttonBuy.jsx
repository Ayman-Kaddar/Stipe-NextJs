"use client";

const ButtonBuy = ({ priceId }) => {
  const handleBuy = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        priceId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await res.json().then((data) => {
      window.location.href = data.url;
    });
  };

  return (
    <div>
      <button
        className="bg-sky-500 text-white px-4 py-2 rounded"
        onClick={() => {
          handleBuy();
        }}
      >
        Comprar
      </button>
    </div>
  );
};

export default ButtonBuy;
