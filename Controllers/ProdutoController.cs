using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Unic.Data;
using Unic.Models;
using System.Web;

namespace Unic.Controllers
{
    public class ProdutoController : Controller
    {
        private readonly MvcUnicContext _context;

        public ProdutoController(MvcUnicContext context)
        {
            _context = context;
        }

        // GET: Produto
        public async Task<IActionResult> Index()
        {
            return View();
        }

        public async Task<IActionResult> ListarProdutos()
        {
            var produtos = await _context.Produto.ToListAsync();
            var listaProdutos = produtos.ToList();
            return Json(listaProdutos);
        }

        // GET: Produto/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var produto = await _context.Produto
                .FirstOrDefaultAsync(m => m.Id == id);
            if (produto == null)
            {
                return NotFound();
            }

            return View(produto);
        }

       [HttpPost]
       public async Task SalvarProduto([FromBody]Produto produto)
        {

                try 
                { 
                    produto.DataCriacao = DateTime.Now;
                    _context.Add(produto);
                    await _context.SaveChangesAsync();

                }
                catch (Exception e)
                {
                   Json(e.Message);
                }

        }

        // GET: Produto/Edit/5
        public async Task<IActionResult> SelecionarProduto(int? id)
        {
    
            var produto = await _context.Produto.FindAsync(id);
            
            return Json(produto);
        }

        // POST: Produto/Edit/5
    
        [HttpPost]
        public async Task<Produto> Edit([FromBody] Produto p)
        {
            var produtoId = p.Id;
            var produto = await _context.Produto.FindAsync(produtoId);
            if (ModelState.IsValid)
            {
                try
                {
                    produto.Descricao = p.Descricao;
                    produto.PrecoCompra = p.PrecoCompra;
                    produto.PrecoVenda = p.PrecoVenda;
                    produto.Estoque = p.Estoque;
                    _context.Update(produto);

                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    
                }
            }
            return produto;
        }

        // GET: Produto/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var produto = await _context.Produto
                .FirstOrDefaultAsync(m => m.Id == id);
            if (produto == null)
            {
                return NotFound();
            }

            return View(produto);
        }

        // POST: Produto/Delete/5
        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var produto = await _context.Produto.FindAsync(id);
            _context.Produto.Remove(produto);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ProdutoExists(int id)
        {
            return _context.Produto.Any(e => e.Id == id);
        }
    }
}
