using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Unic.Models
{
    public class Pessoa
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public string Cpf { get; set; }

        
        public string Email{ get; set; }

        [DataType(DataType.Date)]
        public DateTime Nascimento { get; set; }

        public DateTime DataCriacao { get; set; }


    }
    
}