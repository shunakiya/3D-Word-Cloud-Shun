import { Canvas } from "@react-three/fiber";
import { Text3D, OrbitControls, Center } from "@react-three/drei";
import * as THREE from "three";

type Word = {
  word: string;
  weight: number;
};

const colors = [
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#ec4899",
  "#3b82f6",
  "#06b6d4",
];

function getColor(weight: number): string {
  const index = Math.floor(weight * (colors.length - 1));
  return colors[Math.min(index, colors.length - 1)];
}

// Estimate bounding to avoid overlap
function generatePositions(words: Word[]): THREE.Vector3[] {
  const placed: { x: number; y: number; hw: number; hh: number }[] = [];
  const result: THREE.Vector3[] = [];

  for (const item of words) {
    const size = 0.15 + item.weight * 0.45;
    const hw = (item.word.length * size * 0.6) / 2;
    const hh = size / 2;

    let x = 0;
    let y = 0;
    let attempts = 0;

    do {
      x = (Math.random() - 0.5) * 12;
      y = (Math.random() - 0.5) * 7;
      attempts++;
    } while (
      attempts < 100 &&
      placed.some(
        (p) =>
          Math.abs(p.x - x) < p.hw + hw + 0.2 &&
          Math.abs(p.y - y) < p.hh + hh + 0.2,
      )
    );

    placed.push({ x, y, hw, hh });
    result.push(new THREE.Vector3(x, y, 0));
  }

  return result;
}

const FONT_URL =
  "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json";

export default function WordCloud({ words }: { words: Word[] }) {
  // Re-normalize by rank so colors and sizes spread evenly
  const ranked = words.map((w, i) => ({
    ...w,
    weight: words.length > 1 ? 1 - i / (words.length - 1) : 1,
  }));
  const positions = generatePositions(ranked);

  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls enableZoom={true} enablePan={false} />
      <group>
        {ranked.map((item, i) => {
          const pos = positions[i];
          const size = 0.15 + item.weight * 0.45;

          return (
            <Center key={item.word} position={[pos.x, pos.y, pos.z]}>
              <Text3D
                font={FONT_URL}
                size={size}
                height={size * 0.3}
                curveSegments={6}
              >
                {item.word}
                <meshStandardMaterial color={getColor(item.weight)} />
              </Text3D>
            </Center>
          );
        })}
      </group>
    </Canvas>
  );
}
