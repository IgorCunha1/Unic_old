using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Unic.Models;

namespace Unic.Data
{
    public class MvcProdutoContext : DbContext
    {
        public MvcProdutoContext (DbContextOptions<MvcProdutoContext> options): base(options)
        {

        }

        public DbSet<Produto> Produto { get; set; }
    }
}
