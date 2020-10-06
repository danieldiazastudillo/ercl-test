using ERCL.Prueba.Domain;
using ERCL.Prueba.Domain.Interfaces.Helper;
using System;
using System.Collections.Generic;

namespace ERCL.Prueba.Application
{
    public class CardService
    {
        public IGenericRepository<Card> Repository { get; }
        public IFileProcesor FileProcessor { get; set; } // Typo in procesSor


        public CardService(IGenericRepository<Card> repository, IFileProcesor fileProcesor)
        {
            Repository = repository;
            FileProcessor = fileProcesor;
        }

        

        public void Create(string name, string pan, string pin)
        {
            Repository.Insert(new Card(name, pan, pin));
            Repository.Save();
        }

        /// <summary>
        /// Returns all Cards using the Get method from GenericRepository
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Card> GetAllCards()
        {
            return Repository.Get();
        }

        /// <summary>
        /// Get CARD by Guid
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Card GetCardByGuid(Guid id)
        {
            return Repository.GetByID(id);
        }

        /// <summary>
        /// Updates CARD entity
        /// </summary>
        /// <param name="card"></param>
        public void UpdateCard(Card card)
        {
            Repository.Update(card);
            Repository.Save();
        }

        public string CsvEncriptedFile()
        {
            IEnumerable<Card> cards = GetAllCards();
            return FileProcessor.GetCsv(cards);
        }
    }
}
