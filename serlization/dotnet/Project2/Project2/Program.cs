using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;


namespace Project2
{
    class Program
    {
        static void Main(string[] args)
        {
          
            
            TextReader sr = new StreamReader(args[0]);
            XmlSerializer deserializer = new XmlSerializer(typeof(DummyClass));

            // Deserialization
            var tmp = deserializer.Deserialize(sr);
            DummyClass dc = (DummyClass)tmp;
            sr.Close();
            Console.WriteLine(dc.name);
         
            
           
        }
    }
}
