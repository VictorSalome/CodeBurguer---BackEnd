import Product from "../models/Product";
import User from "../models/User";

class ProductDeleteController {
  async deleteProduct(request, response) {
    try {
      const { admin: isAdmin } = await User.findByPk(request.userId);
      if (!isAdmin) {
        return response.status(401).json();
      }

      const { id } = request.params;

      const product = await Product.findByPk(id);

      if (!product) {
        return response
          .status(401)
          .json({ erro: "Certifique-se de que o ID do produto está correto" });
      }

      await product.destroy();

      return response
        .status(200)
        .json({ message: "Produto excluído com sucesso" });
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

export default new ProductDeleteController();
