<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Lampu Jalan Tenaga Surya 100W',
                'price' => 1250000,
                'category' => 'Lampu Jalan',
                'image' => 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400',
                'description' => 'Lampu jalan tenaga surya dengan panel surya terintegrasi. Hemat energi dan ramah lingkungan. Dilengkapi dengan sensor cahaya otomatis.',
                'specifications' => [
                    'Daya' => '100W',
                    'Panel Surya' => 'Polycrystalline 150W',
                    'Baterai' => 'LiFePO4 12V 50Ah',
                    'Waktu Pengisian' => '6-8 jam',
                    'Durasi Pencahayaan' => '12-14 jam',
                    'Material' => 'Aluminium Die-cast',
                    'IP Rating' => 'IP65'
                ],
                'is_featured' => true,
            ],
            [
                'name' => 'Lampu Jalan Tenaga Surya 200W',
                'price' => 2100000,
                'category' => 'Lampu Jalan',
                'image' => 'https://images.unsplash.com/photo-1545208942-e0c45d2d7c8c?w=400',
                'description' => 'Lampu jalan surya high-power untuk jalan utama dan area komersial. Cahaya terang dan tahan lama.',
                'specifications' => [
                    'Daya' => '200W',
                    'Panel Surya' => 'Monocrystalline 250W',
                    'Baterai' => 'LiFePO4 24V 60Ah',
                    'Waktu Pengisian' => '5-7 jam',
                    'Durasi Pencahayaan' => '14-16 jam',
                    'Material' => 'Aluminium Die-cast',
                    'IP Rating' => 'IP66'
                ],
                'is_featured' => true,
            ],
            [
                'name' => 'Lampu Taman Solar LED 50W',
                'price' => 450000,
                'category' => 'Lampu Taman',
                'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
                'description' => 'Lampu taman estetik dengan panel surya. Desain modern untuk mempercantik taman rumah Anda.',
                'specifications' => [
                    'Daya' => '50W',
                    'Panel Surya' => 'Polycrystalline 60W',
                    'Baterai' => 'Li-ion 12V 20Ah',
                    'Waktu Pengisian' => '4-6 jam',
                    'Durasi Pencahayaan' => '8-10 jam',
                    'Material' => 'ABS + Aluminium',
                    'IP Rating' => 'IP54'
                ],
                'is_featured' => true,
            ],
            [
                'name' => 'Lampu Taman Solar Vintage 30W',
                'price' => 350000,
                'category' => 'Lampu Taman',
                'image' => 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400',
                'description' => 'Lampu taman dengan desain vintage klasik. Cocok untuk taman bergaya tradisional atau klasik.',
                'specifications' => [
                    'Daya' => '30W',
                    'Panel Surya' => 'Polycrystalline 40W',
                    'Baterai' => 'Li-ion 12V 15Ah',
                    'Waktu Pengisian' => '5-7 jam',
                    'Durasi Pencahayaan' => '8-10 jam',
                    'Material' => 'Besi Tempa',
                    'IP Rating' => 'IP44'
                ],
                'is_featured' => false,
            ],
            [
                'name' => 'Solar Panel 300W Monocrystalline',
                'price' => 2800000,
                'category' => 'Solar Panel',
                'image' => 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400',
                'description' => 'Panel surya berkualitas tinggi dengan efisiensi konversi tinggi. Garansi 25 tahun.',
                'specifications' => [
                    'Daya Maksimal' => '300W',
                    'Tipe Sel' => 'Monocrystalline',
                    'Efisiensi' => '21.5%',
                    'Dimensi' => '1640 x 992 x 35mm',
                    'Berat' => '18.5 kg',
                    'Voc' => '45.2V',
                    'Isc' => '8.8A'
                ],
                'is_featured' => true,
            ],
            [
                'name' => 'Solar Panel 450W Bifacial',
                'price' => 4200000,
                'category' => 'Solar Panel',
                'image' => 'https://images.unsplash.com/photo-1545208942-e0c45d2d7c8c?w=400',
                'description' => 'Panel surya bifacial yang menangkap cahaya dari kedua sisi. Efisiensi maksimal untuk instalasi ground-mount.',
                'specifications' => [
                    'Daya Maksimal' => '450W',
                    'Tipe Sel' => 'Bifacial Monocrystalline',
                    'Efisiensi' => '23.2%',
                    'Dimensi' => '2094 x 1038 x 35mm',
                    'Berat' => '26 kg',
                    'Voc' => '50.8V',
                    'Isc' => '11.2A'
                ],
                'is_featured' => true,
            ],
            [
                'name' => 'Baterai Lithium Solar 100Ah 48V',
                'price' => 18500000,
                'category' => 'Baterai',
                'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
                'description' => 'Baterai lithium premium untuk sistem penyimpanan energi surya. Siklus hidup panjang dan performa stabil.',
                'specifications' => [
                    'Kapasitas' => '100Ah',
                    'Tegangan' => '48V',
                    'Energi' => '4.8 kWh',
                    'Siklus Hidup' => '6000+ siklus',
                    'DOD' => '90%',
                    'BMS' => 'Built-in Smart BMS',
                    'Garansi' => '10 tahun'
                ],
                'is_featured' => true,
            ],
            [
                'name' => 'Baterai LiFePO4 200Ah 12V',
                'price' => 6500000,
                'category' => 'Baterai',
                'image' => 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400',
                'description' => 'Baterai LiFePO4 aman dan tahan lama untuk sistem surya off-grid. Performa unggul dalam berbagai suhu.',
                'specifications' => [
                    'Kapasitas' => '200Ah',
                    'Tegangan' => '12V',
                    'Energi' => '2.4 kWh',
                    'Siklus Hidup' => '4000+ siklus',
                    'DOD' => '80%',
                    'BMS' => 'Built-in BMS',
                    'Berat' => '22 kg'
                ],
                'is_featured' => false,
            ],
            [
                'name' => 'Inverter Surya Hybrid 5kW',
                'price' => 12500000,
                'category' => 'Inverter',
                'image' => 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400',
                'description' => 'Inverter hybrid untuk sistem surya on-grid dan off-grid. Dilengkapi dengan charger MPPT built-in.',
                'specifications' => [
                    'Daya Rated' => '5kW',
                    'Daya Puncak' => '10kW',
                    'Efisiensi' => '97.5%',
                    'MPPT' => '2 channel',
                    'Tegangan PV Max' => '500V',
                    'Output' => 'Pure Sine Wave',
                    'Komunikasi' => 'WiFi, RS485'
                ],
                'is_featured' => true,
            ],
            [
                'name' => 'Inverter Off-Grid 3kW Pure Sine',
                'price' => 5800000,
                'category' => 'Inverter',
                'image' => 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=400',
                'description' => 'Inverter off-grid dengan output pure sine wave. Cocok untuk rumah dengan sistem surya mandiri.',
                'specifications' => [
                    'Daya Rated' => '3kW',
                    'Daya Puncak' => '6kW',
                    'Efisiensi' => '95%',
                    'Input DC' => '24V',
                    'Output AC' => '220V 50Hz',
                    'THD' => '< 3%',
                    'Proteksi' => 'Overload, Short Circuit'
                ],
                'is_featured' => false,
            ],
            [
                'name' => 'Solar Water Heater 150L',
                'price' => 7500000,
                'category' => 'Pemanas Air',
                'image' => 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400',
                'description' => 'Pemanas air tenaga surya kapasitas 150 liter. Hemat listrik hingga 80% untuk kebutuhan air panas.',
                'specifications' => [
                    'Kapasitas' => '150 liter',
                    'Panel Surya' => '2 x 1.5m²',
                    'Material Tangki' => 'Stainless Steel 304',
                    'Isolasi' => 'Polyurethane 50mm',
                    'Tekanan Kerja' => '0.6 MPa',
                    'Suhu Maksimal' => '75°C',
                    'Garansi' => '5 tahun'
                ],
                'is_featured' => true,
            ],
            [
                'name' => 'Solar Charge Controller MPPT 60A',
                'price' => 2800000,
                'category' => 'Aksesoris',
                'image' => 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=400',
                'description' => 'Charge controller MPPT dengan efisiensi tracking tinggi. Melindungi baterai dari overcharge.',
                'specifications' => [
                    'Arus Max' => '60A',
                    'Tegangan PV Max' => '150V',
                    'Efisiensi' => '99.5%',
                    'Tegangan Baterai' => '12/24/36/48V Auto',
                    'Display' => 'LCD Backlit',
                    'Komunikasi' => 'RS485, Bluetooth',
                    'Proteksi' => 'Overcharge, Overdischarge'
                ],
                'is_featured' => false,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
