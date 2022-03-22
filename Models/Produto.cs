using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Unic.Models
{
    public class Produto
    {

        public int Id { get; set; }

        public string Descricao { get; set; }

        public DateTime DataCriacao { get; set; }

        public decimal Estoque { get; set; }

        public decimal PrecoCompra { get; set; }

        public decimal PrecoVenda { get; set; }
    }
}
