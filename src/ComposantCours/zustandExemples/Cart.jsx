import useAuthStore from "../../Zustand/auth_store";
import useCartStore from "../../Zustand/cart_store";

export default function Cart(props) {
    const { user, login, logout } = useAuthStore();
  const { items, addItem } = useCartStore();
  return (
    <> 
    <div>
      <h1>Gestion du Panier avec Zustand</h1>
      {user ? (
        <>
          <p>Bienvenue, {user.name}!</p>
          <button onClick={logout}>Se déconnecter</button>
        </>
      ) : (
        <button onClick={() => login({ name: "Foulen Ben Foulen" })}>Se connecter</button>
      )}
      <button onClick={() => addItem({ id: 1, name: "Produit A" })}>
        Ajouter un Produit A
      </button>

      <h2>Panier</h2>
      {items.length > 0 ? (
        items.map((item) => <p key={item.id}>{item.name}</p>)
      ) : (
        <p>Le panier est vide.</p>
      )}
    </div></>)
}