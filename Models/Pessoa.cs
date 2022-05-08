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

        [Required (ErrorMessage = "Você precisa digita o seu Nome")]
        public string Nome { get; set; }

        [Required (ErrorMessage = "Você precisa digita o seu CPF")]
        [StringLength(11, MinimumLength = 11, ErrorMessage = "CPF Errado")]
        public string Cpf { get; set; }

        [Required (ErrorMessage = "Você precisa digita o seu Email")]
        public string Email{ get; set; }

        [Required (ErrorMessage = "Você precisa digita seu Nascimento")]
        [DataType(DataType.Date)]
        public DateTime Nascimento { get; set; }

        public DateTime DataCriacao { get; set; }


    }
    
}