using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Xml;
using System.Xml.Serialization;

namespace Project4
{
    class Program
    {
        static void Main(string[] args)
        {
            String input = File.ReadAllText(args[0]);
            Deserializer(input);
            
        }
        static void Deserializer(String xmlinput)
        { 
            
            XmlDocument xmldoc = new XmlDocument();
            xmldoc.LoadXml(xmlinput);
            foreach(XmlElement x in xmldoc.SelectNodes("Class/item"))
            {

                string ctype = x.GetAttribute("role");
                var xmlser = new XmlSerializer(Type.GetType(ctype));
                Console.WriteLine(xmlser);
                var xreader = new XmlTextReader(new StringReader(x.InnerXml));
                xmlser.Deserialize(xreader);
            }
        }
    }
    
}
